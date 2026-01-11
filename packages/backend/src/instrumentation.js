const { isMainThread } = require('node:worker_threads');

if (isMainThread) {
  const { NodeSDK } = require('@opentelemetry/sdk-node');
  const {
    getNodeAutoInstrumentations,
  } = require('@opentelemetry/auto-instrumentations-node');
  const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

  const prometheusExporter = new PrometheusExporter({
    host: '0.0.0.0',
    port: 9464,
    endpoint: '/metrics',
  });

  const sdk = new NodeSDK({
    metricReader: prometheusExporter,
    instrumentations: [getNodeAutoInstrumentations()],
  });

  sdk.start();
}
