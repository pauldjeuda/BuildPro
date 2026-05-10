'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cloud, Upload, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export default function NewRapportPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    chantier: '',
    date: new Date().toISOString().split('T')[0],
    weather: 'sunny',
    temperature: '',
    workers: '',
    worksDone: '',
    observations: '',
    incidents: false,
    nextTasks: '',
  });

  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const fileNames = files.map((f) => f.name);
      setUploadedPhotos((prev) => [...prev, ...fileNames]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Rapport créé:', { ...formData, photos: uploadedPhotos });
    router.push('/rapports');
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6 md:ml-64">
        {/* Header */}
        <div className="space-y-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </button>
          <h1 className="text-3xl font-bold text-foreground">Nouveau Rapport Journalier</h1>
          <p className="text-muted-foreground">Remplissez le rapport du jour</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Identification */}
          <Card>
            <CardHeader>
              <CardTitle>Identification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Chantier *</label>
                  <select
                    name="chantier"
                    value={formData.chantier}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                    required
                  >
                    <option value="">Sélectionner un chantier</option>
                    <option value="ch1">Rénovation Paris 5ème</option>
                    <option value="ch2">Construction Centre Commercial</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date *</label>
                  <Input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conditions Météorologiques */}
          <Card>
            <CardHeader>
              <CardTitle>Conditions du Jour</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Météo</label>
                  <select
                    name="weather"
                    value={formData.weather}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  >
                    <option value="sunny">Ensoleillé</option>
                    <option value="cloudy">Nuageux</option>
                    <option value="rainy">Pluvieux</option>
                    <option value="snow">Neigeux</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Température (°C)</label>
                  <Input
                    name="temperature"
                    type="number"
                    value={formData.temperature}
                    onChange={handleChange}
                    placeholder="ex: 18"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Effectifs et Travaux */}
          <Card>
            <CardHeader>
              <CardTitle>Effectifs et Travaux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre d&apos;Ouvriers Présents *</label>
                <Input
                  name="workers"
                  type="number"
                  value={formData.workers}
                  onChange={handleChange}
                  placeholder="ex: 8"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Travaux Effectués *</label>
                <Textarea
                  name="worksDone"
                  value={formData.worksDone}
                  onChange={handleChange}
                  placeholder="Détaillez les travaux réalisés aujourd'hui..."
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Observations et Incidents */}
          <Card>
            <CardHeader>
              <CardTitle>Observations et Incidents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Observations</label>
                <Textarea
                  name="observations"
                  value={formData.observations}
                  onChange={handleChange}
                  placeholder="Remarques générales sur le chantier..."
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="incidents"
                  checked={formData.incidents}
                  onChange={handleChange}
                  id="incidents"
                  className="h-4 w-4"
                />
                <label htmlFor="incidents" className="text-sm font-medium">
                  Incidents ou problèmes signalés
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle>Photographies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Cloud className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground mb-3">
                  Glissez-déposez vos photos ou cliquez pour en sélectionner
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('photo-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Sélectionner des photos
                </Button>
              </div>

              {uploadedPhotos.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Photos sélectionnées:</p>
                  <div className="flex flex-wrap gap-2">
                    {uploadedPhotos.map((photo, idx) => (
                      <Badge key={idx} variant="secondary">
                        {photo}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tâches Suivantes */}
          <Card>
            <CardHeader>
              <CardTitle>Tâches Suivantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="text-sm font-medium">À faire demain/prochainement</label>
                <Textarea
                  name="nextTasks"
                  value={formData.nextTasks}
                  onChange={handleChange}
                  placeholder="Décrivez les tâches planifiées pour la suite..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              Soumettre le Rapport
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
