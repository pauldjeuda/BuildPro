'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Trash2, Save } from 'lucide-react';
import Link from 'next/link';

interface LineItem {
  id: string;
  description: string;
  quantite: number;
  unite: string;
  prixUnitaire: number;
  montant: number;
}

export default function NouveauDemandePage() {
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: '1',
      description: '',
      quantite: 0,
      unite: 'unités',
      prixUnitaire: 0,
      montant: 0,
    },
  ]);

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: Date.now().toString(),
        description: '',
        quantite: 0,
        unite: 'unités',
        prixUnitaire: 0,
        montant: 0,
      },
    ]);
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  const updateLineItem = (id: string, field: string, value: any) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === 'quantite' || field === 'prixUnitaire') {
            updated.montant = updated.quantite * updated.prixUnitaire;
          }
          return updated;
        }
        return item;
      })
    );
  };

  const totalMontant = lineItems.reduce((sum, item) => sum + item.montant, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Nouvelle Demande d'Achat</h1>
          <p className="text-muted-foreground mt-1">
            Créez une demande d'achat pour un chantier
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-4">
          {/* Infos générales */}
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Demandeur</label>
                  <Input placeholder="Nom du demandeur" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input type="date" className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Chantier</label>
                <Input
                  placeholder="Sélectionner un chantier"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Observations</label>
                <Textarea
                  placeholder="Notes additionnelles..."
                  className="mt-1"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Lignes */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Lignes d'achat</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={addLineItem}
                >
                  <Plus className="h-4 w-4" />
                  Ajouter une ligne
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Unité</TableHead>
                      <TableHead>P.U.</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lineItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Input
                            placeholder="Description du produit"
                            value={item.description}
                            onChange={(e) =>
                              updateLineItem(item.id, 'description', e.target.value)
                            }
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell className="w-20">
                          <Input
                            type="number"
                            value={item.quantite}
                            onChange={(e) =>
                              updateLineItem(
                                item.id,
                                'quantite',
                                parseFloat(e.target.value)
                              )
                            }
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell className="w-24">
                          <Input
                            value={item.unite}
                            onChange={(e) =>
                              updateLineItem(item.id, 'unite', e.target.value)
                            }
                            className="w-full"
                            placeholder="unités"
                          />
                        </TableCell>
                        <TableCell className="w-24">
                          <Input
                            type="number"
                            value={item.prixUnitaire}
                            onChange={(e) =>
                              updateLineItem(
                                item.id,
                                'prixUnitaire',
                                parseFloat(e.target.value)
                              )
                            }
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell className="w-24 font-medium">
                          {item.montant.toLocaleString('fr-FR')} €
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLineItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Résumé */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Résumé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>{totalMontant.toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">TVA (20%)</span>
                  <span>{(totalMontant * 0.2).toLocaleString('fr-FR')} €</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total TTC</span>
                  <span>
                    {(totalMontant * 1.2).toLocaleString('fr-FR')} €
                  </span>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <Button className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  Soumettre la demande
                </Button>
                <Link href="/achats/demandes" className="block">
                  <Button variant="outline" className="w-full">
                    Annuler
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
