(function () {
  "use strict";
  window.__BRAND__ = {
    name: "RESICO vs Régimen General",
    tagline: "Descubre qué régimen fiscal te conviene más",
    year: "2026",
    sourceNote: "Tarifas Art. 96 LISR y tabla RESICO personas físicas, Anexo 8 SAT 2026.",

    // Tarifa mensual Art. 96 LISR (Régimen General / Actividad Empresarial y Profesional)
    // { limInf, limSup, cuotaFija, porcExcedente }
    tarifaGeneral: [
      { limInf: 0.01, limSup: 844.59, cuota: 0.00, pct: 0.0192 },
      { limInf: 844.60, limSup: 7168.51, cuota: 16.22, pct: 0.0640 },
      { limInf: 7168.52, limSup: 12598.02, cuota: 420.95, pct: 0.1088 },
      { limInf: 12598.03, limSup: 14644.64, cuota: 1011.68, pct: 0.1600 },
      { limInf: 14644.65, limSup: 17533.64, cuota: 1339.14, pct: 0.1792 },
      { limInf: 17533.65, limSup: 35362.83, cuota: 1856.84, pct: 0.2136 },
      { limInf: 35362.84, limSup: 55736.68, cuota: 5665.16, pct: 0.2352 },
      { limInf: 55736.69, limSup: 106410.50, cuota: 10457.09, pct: 0.3000 },
      { limInf: 106410.51, limSup: 141880.66, cuota: 25659.23, pct: 0.3200 },
      { limInf: 141880.67, limSup: 425641.99, cuota: 37009.69, pct: 0.3400 },
      { limInf: 425642.00, limSup: Infinity, cuota: 133488.54, pct: 0.3500 }
    ],

    // Tabla RESICO Personas Físicas — tasa aplicada sobre INGRESOS (sin deducciones)
    tarifaResico: [
      { limSup: 25000.00, tasa: 0.0100 },
      { limSup: 50000.00, tasa: 0.0110 },
      { limSup: 83333.33, tasa: 0.0150 },
      { limSup: 208333.33, tasa: 0.0200 },
      { limSup: 291666.66, tasa: 0.0250 }
      // Arriba de $291,666.66/mes (~$3.5M anual) ya no aplica RESICO
    ],

    resicoTopeMensual: 291666.66,
    resicoTopeAnual: 3500000,

    faqs: [
      {
        q: "¿Quién puede tributar en RESICO?",
        a: "Personas físicas con actividad empresarial, profesional u otorgamiento de uso o goce de bienes, siempre que sus ingresos totales del ejercicio anterior (o estimados) no superen $3,500,000 MXN al año. No aplica para socios, accionistas o integrantes de personas morales, ni para quienes perciban ingresos por salarios, entre otras exclusiones que marca la ley."
      },
      {
        q: "¿Por qué RESICO puede salir más caro si tengo muchas deducciones?",
        a: "Porque RESICO cobra un porcentaje fijo sobre tus ingresos totales, sin permitir deducir gastos. Si tu actividad tiene gastos deducibles altos (renta de oficina, insumos, nómina, etc.), el Régimen General —que sí permite restar esas deducciones antes de calcular el impuesto— puede terminar siendo más barato, aunque su tarifa nominal sea más alta."
      },
      {
        q: "¿Esta calculadora sustituye a mi contador?",
        a: "No. Es una estimación simplificada basada en las tarifas mensuales publicadas por el SAT para 2026, pensada para darte una primera idea. No considera IVA, PTU, subsidio al empleo, otras deducciones personales, ni casos particulares de tu actividad. Para una decisión definitiva, consulta a un contador."
      },
      {
        q: "¿El resultado incluye IVA?",
        a: "No. Esta calculadora solo compara el ISR (Impuesto Sobre la Renta) de ambos regímenes. El IVA se causa y se paga de forma separada en ambos regímenes."
      },
      {
        q: "¿Qué pasa si mis ingresos superan el tope de RESICO?",
        a: "Si tus ingresos del ejercicio superan $3,500,000 MXN anuales, dejas de tributar en RESICO a partir del mes siguiente y pasas automáticamente al Régimen General de Actividad Empresarial y Profesional."
      }
    ]
  };
})();
