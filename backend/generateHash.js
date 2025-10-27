// Script para generar hash de contraseña para datos de prueba
const bcrypt = require('bcrypt');

const generateHash = async () => {
  const password = 'demo123';
  const saltRounds = 10;

  const hash = await bcrypt.hash(password, saltRounds);

  console.log('\n=== HASH GENERADO ===');
  console.log('Contraseña:', password);
  console.log('Hash:', hash);
  console.log('\nUsa este hash en el archivo seedData.sql');
  console.log('\nEjemplo:');
  console.log(`INSERT INTO users (name, email, password) VALUES`);
  console.log(`('Usuario Demo', 'demo@taskflow.com', '${hash}');`);
  console.log('\n');
};

generateHash().catch(console.error);
