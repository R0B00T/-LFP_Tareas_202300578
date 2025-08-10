'use strict';
const fs = require('fs');
const readline = require('readline');

const INVENTORY_FILE = 'inventario.inv';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mostrarMenu() {
  console.log('\n=== MENÚ ===');
  console.log('1. Leer archivo .inv e imprimir su contenido.');
  console.log('2. Salir.');
  rl.question('Seleccione una opción: ', manejarOpcion);
}

async function manejarOpcion(opcion) {
  const op = opcion.trim();
  switch (op) {
    case '1':
      await leerEImprimirInventario();
      mostrarMenu();
      break;
    case '2':
      console.log('¡Hasta luego!');
      rl.close(); 
      break;

    default:
      console.log('Opción no válida. Intente de nuevo.');
      mostrarMenu();
      break;
  }
}

function leerEImprimirInventario() {
  return new Promise((resolve) => {
    try {

      if (!fs.existsSync(INVENTORY_FILE)) {
        console.error(`\n[Error] No se encontró el archivo '${INVENTORY_FILE}'. ` +
                      `Créalo en el mismo directorio y vuelve a intentar.`);
        return resolve();
      }

      const stream = fs.createReadStream(INVENTORY_FILE, { encoding: 'utf8' });

      stream.on('error', (err) => {
        console.error('[Error] No se pudo abrir el archivo:', err.message);
        resolve();
      });

      const rlFile = readline.createInterface({
        input: stream,
        crlfDelay: Infinity 
      });

      let imprimioEncabezado = false;
      let lineasValidas = 0;

      rlFile.on('line', (line) => {
        const trimmed = line.trim();
        if (trimmed === '') return; 

        const partes = trimmed.split(/\s+/);

        if (partes.length < 4) {
          console.warn('[Aviso] Línea con formato inválido:', line);
          return;
        }

        const [producto, cantidad, precio, ubicacion] = partes;

        if (!imprimioEncabezado) {
          console.log('\nProducto        | Cantidad |   PrecioUnit | Ubicación ');
          console.log('----------------+----------+--------------+-----------');
          imprimioEncabezado = true;
        }

        const fila = `${(producto || '').padEnd(15)} | ${(cantidad || '').toString().padStart(8)} | ` +
                     `${(precio || '').toString().padStart(12)} | ${(ubicacion || '').padEnd(9)}`;
        console.log(fila);
        lineasValidas++;
      });

      rlFile.on('close', () => {
        if (lineasValidas === 0) {
          console.log('(El archivo está vacío o todas las líneas son inválidas).');
        }
        resolve();
      });
    } catch (err) {
      console.error('[Error] Ocurrió un problema leyendo el archivo:', err.message);
      resolve(); 
    }
  });
}
mostrarMenu();
