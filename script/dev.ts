import concurrently from 'concurrently';

async function main() {
  concurrently(['npm:dev:server', 'npm:dev:keystone']);
}

main();
