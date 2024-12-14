import concurrently from 'concurrently';

async function main() {
  concurrently([
    'npm:dev:keystone',
    'npm:dev:ui',
    'npm:dev:server',
    'npm:dev:lib',
  ]);
}

main();
