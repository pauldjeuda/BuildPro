import React from 'react';
import { Badge } from '@/components/ui/badge';

type StatusType =
  | 'actif'
  | 'inactif'
  | 'en_cours'
  | 'termine'
  | 'lance'
  | 'suspendu'
  | 'cloture'
  | 'brouillon'
  | 'soumis'
  | 'valide'
  | 'rejete'
  | 'declare'
  | 'enquete'
  | 'actions'
  | 'clos'
  | 'disponible'
  | 'en_penurie'
  | 'epuise'
  | 'demande'
  | 'commandee'
  | 'livree'
  | 'facturee'
  | 'payee'
  | 'ouverte'
  | 'fermee'
  | 'operational'
  | 'maintenance'
  | 'ok'
  | 'alert'
  | 'critical'
  | 'open'
  | 'resolved';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const statusConfig: Record<
  StatusType,
  {
    variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
    label: string;
  }
> = {
  actif: { variant: 'success', label: 'Actif' },
  inactif: { variant: 'secondary', label: 'Inactif' },
  en_cours: { variant: 'default', label: 'En cours' },
  termine: { variant: 'success', label: 'Terminé' },
  lance: { variant: 'default', label: 'Lancé' },
  suspendu: { variant: 'warning', label: 'Suspendu' },
  cloture: { variant: 'secondary', label: 'Clôturé' },
  brouillon: { variant: 'secondary', label: 'Brouillon' },
  soumis: { variant: 'default', label: 'Soumis' },
  valide: { variant: 'success', label: 'Validé' },
  rejete: { variant: 'destructive', label: 'Rejeté' },
  declare: { variant: 'destructive', label: 'Déclaré' },
  enquete: { variant: 'warning', label: 'Enquête' },
  actions: { variant: 'default', label: 'Actions' },
  clos: { variant: 'success', label: 'Clos' },
  disponible: { variant: 'success', label: 'Disponible' },
  en_penurie: { variant: 'warning', label: 'En pénurie' },
  epuise: { variant: 'destructive', label: 'Épuisé' },
  demande: { variant: 'default', label: 'Demande' },
  commandee: { variant: 'default', label: 'Commandée' },
  livree: { variant: 'success', label: 'Livrée' },
  facturee: { variant: 'secondary', label: 'Facturée' },
  payee: { variant: 'success', label: 'Payée' },
  ouverte: { variant: 'default', label: 'Ouverte' },
  fermee: { variant: 'secondary', label: 'Fermée' },
  operational: { variant: 'success', label: 'Opérationnel' },
  maintenance: { variant: 'warning', label: 'Maintenance' },
  ok: { variant: 'success', label: 'OK' },
  alert: { variant: 'warning', label: 'Alerte' },
  critical: { variant: 'destructive', label: 'Critique' },
  open: { variant: 'destructive', label: 'Ouvert' },
  resolved: { variant: 'success', label: 'Résolu' },
  en_cours: { variant: 'default', label: 'En cours' },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status] || { variant: 'outline', label: status };

  return (
    <Badge variant={config.variant}>
      {label || config.label}
    </Badge>
  );
}
