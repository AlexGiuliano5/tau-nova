export interface BffOntClientResponse {
  abonado: string;
  serviceAccount: string;
  localidad: string;
  province: string;
  calle: string;
  altura: number;
  pisoDpto: string;
  ip: string;
  mac: string;
  lat: string;
  lng: string;
  areaService: string;
  cmts: string;
  servicio: string;
  enterprise: string;
  model: string;
  swVersion: string;
  hwVersion: string;
  firmware: string;
  teleF_CUENTA: string;
  teleF_CLIENTE: string;
  teleF_CASA: string;
  teleF_PERSONA: string;
  tipO_DOMIC: string;
  codE_ZIP: string;
  paquetE_ADQUIRIDO: string;
  veloC_DESCARGA: string;
  veloC_SUBIDA: string;
  nuM_SERIAL_EQUIPO: string;
  score: string;
  semanaScore: string;
  fechaScore: string;
  caliF_CPE_SCORE: string;
}

export interface OntClientInfo {
  nombre: string;
  numeroCliente: string;
  provincia: string;
  localidad: string;
  direccion: string;
  pisoDpto: string;
  telefonoFijo: string;
  telefonoMovil: string;
}

export interface BffOntInfoByOntResponse {
  lastUpTime: string;
  lastDnTime: string;
  downCause: string;
  distance: string;
  equipmentType: string;
}

export interface BffLastMetricByOntResponse {
  slot: string;
  port: string;
  olt: string;
}

export interface BffMetricsCardsResponse {
  title: string;
  max: string;
  avg: string;
  min: string;
  actual: string;
}

export interface BffHistoricDownResponse {
  status: string;
  date: string;
  dateEnd: string;
  duration: string;
}

export interface BffMetricsGridResponse {
  dataSchema: {
    columnNames: string[];
    columnDataTypes: string[];
  };
  rows: Array<Array<number | null | string>>;
  extraData: {
    coordinates: Array<{
      serial: string;
      lat: null | string;
      lon: null | string;
    }>;
  };
  pageNumber: null;
  pageSize: null;
  totalPages: null;
  totalRecords: null;
}

export interface OntInfoDetails {
  ponId: string;
  serial: string;
  vendor: string;
  olt: string;
  placa: string;
  puerto: string;
  estado: string;
  distancia: string;
  ultimaVezActiva: string;
  ultimaVezInactiva: string;
  causaUltimaInactividad: string;
}

export type MetricStatusColor = 'card-green' | 'card-yellow' | 'card-red' | 'neutral';

export interface OntMetricCard {
  title: string;
  actual: string;
  min: string;
  avg: string;
  max: string;
  unit: string;
  color: MetricStatusColor;
}

export interface OntHistoricDownItem {
  status: string;
  date: string;
  time: string;
  duration: string;
  timestampMs: number | null;
  isInLast24h: boolean;
}

export interface OntNeighborPreviewItem {
  serial: string;
  estado: string;
  ontRx: string;
  oltRx: string;
}

export interface OntNeighborFullItem {
  rowId: string;
  serial: string;
  estado: string;
  ontRx: string;
  calle: string;
  altura: string;
  piso: string;
  depto: string;
  ontTx: string;
  oltRx: string;
  oltTx: string;
  oltVolt: string;
  ontTemp: string;
  ontVolt: string;
  ontBiasCurrent: string;
  oltBiasCurrent: string;
  portTemp: string;
  slot: string;
  port: string;
  provincia: string;
}
