#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

// Configurações do Supabase
const SUPABASE_URL = 'https://csmoqkvdrzpgpcldaqaj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbW9xa3ZkcnpwZ3BjbGRhcWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NzYyNjUsImV4cCI6MjA3NTM1MjI2NX0.SgVdru_QkhIDgR_AXedfMZjqwJ21PBgr4WssW2J02GQ';

// Ler o schema SQL
const schemaSQL = fs.readFileSync('./supabase/schema.sql', 'utf8');

// Dividir o SQL em comandos individuais
const commands = schemaSQL
  .split(';')
  .map(cmd => cmd.trim())
  .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

console.log(`📊 Encontrados ${commands.length} comandos SQL para executar...`);

// Função para fazer requisição HTTP
function makeRequest(sql) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      query: sql
    });

    const options = {
      hostname: 'csmoqkvdrzpgpcldaqaj.supabase.co',
      port: 443,
      path: '/rest/v1/rpc/exec',
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, data: responseData });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Executar comandos um por vez
async function executeSchema() {
  console.log('🚀 Iniciando execução do schema...\n');
  
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    
    // Pular comentários
    if (command.startsWith('--') || command.trim() === '') {
      continue;
    }
    
    try {
      console.log(`[${i + 1}/${commands.length}] Executando: ${command.substring(0, 50)}...`);
      
      // Tentar executar via RPC exec
      try {
        await makeRequest(command);
        console.log(`✅ Sucesso!\n`);
      } catch (error) {
        console.log(`⚠️  Erro na execução direta: ${error.message}`);
        console.log(`📝 Comando: ${command.substring(0, 100)}...\n`);
      }
      
      // Pequena pausa entre comandos
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.log(`❌ Erro: ${error.message}\n`);
    }
  }
  
  console.log('🎉 Execução concluída!');
  console.log('\n📋 Próximos passos:');
  console.log('1. Verificar se as tabelas foram criadas no Supabase Dashboard');
  console.log('2. Testar o app no browser');
  console.log('3. Fazer login e verificar se a gamificação aparece');
}

// Executar
executeSchema().catch(console.error);
