'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function CreateChantierPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zipCode: '',
    client: '',
    type: '',
    startDate: '',
    endDate: '',
    budget: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de soumission
    console.log('Nouveau chantier créé:', formData);
    router.push('/chantiers');
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6 md:ml-64">
        {/* Header */}
        <div className="space-y-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </button>
          <h1 className="text-3xl font-bold text-foreground">Créer un Nouveau Chantier</h1>
          <p className="text-muted-foreground">Remplissez les informations du chantier</p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Informations du Chantier</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom du Chantier *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ex: Rénovation Immeuble Paris 5ème"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type de Chantier *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground"
                    required
                  >
                    <option value="">Sélectionner un type</option>
                    <option value="renovation">Rénovation</option>
                    <option value="construction">Construction</option>
                    <option value="demolition">Démolition</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Adresse *</label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="ex: 25 Rue de l'Estrapade"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Client *</label>
                  <Input
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    placeholder="ex: Société Civile Immobilière"
                    required
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ville *</label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="ex: Paris"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Code Postal *</label>
                  <Input
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="ex: 75005"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Budget Alloué (€) *</label>
                  <Input
                    name="budget"
                    type="number"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="ex: 850000"
                    required
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date de Début *</label>
                  <Input
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date de Fin Prévue *</label>
                  <Input
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Row 5 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Détails supplémentaires sur le chantier..."
                  rows={4}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="flex-1"
                >
                  Créer le Chantier
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
