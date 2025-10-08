#!/usr/bin/env node

const https = require('https');

// Configurações do Supabase
const SUPABASE_URL = 'https://csmoqkvdrzpgpcldaqaj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbW9xa3ZkcnpwZ3BjbGRhcWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NzYyNjUsImV4cCI6MjA3NTM1MjI2NX0.SgVdru_QkhIDgR_AXedfMZjqwJ21PBgr4WssW2J02GQ';

// Função para fazer requisição HTTP
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'csmoqkvdrzpgpcldaqaj.supabase.co',
      port: 443,
      path: path,
      method: method,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      }
    };

    if (data) {
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

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

    if (data) {
      req.write(data);
    }
    req.end();
  });
}

// Criar tabelas via API REST
async function createTables() {
  console.log('🚀 Criando tabelas no Supabase...\n');

  // 1. Tabela devotionals
  try {
    console.log('📖 Criando tabela devotionals...');
    const devotionalsData = JSON.stringify({
      name: 'devotionals',
      schema: 'public',
      columns: [
        { name: 'id', type: 'uuid', default: 'gen_random_uuid()', primary_key: true },
        { name: 'slug', type: 'text', unique: true, nullable: false },
        { name: 'title', type: 'text', nullable: false },
        { name: 'theme', type: 'text', nullable: false },
        { name: 'day_number', type: 'integer' },
        { name: 'difficulty', type: 'text', default: 'iniciante' },
        { name: 'context', type: 'jsonb', nullable: false },
        { name: 'scripture', type: 'jsonb', nullable: false },
        { name: 'living_word', type: 'jsonb', nullable: false },
        { name: 'action', type: 'jsonb', nullable: false },
        { name: 'prayer', type: 'jsonb', nullable: false },
        { name: 'estimated_time', type: 'integer', default: 7 },
        { name: 'tags', type: 'text[]' },
        { name: 'keywords', type: 'text[]' },
        { name: 'is_premium', type: 'boolean', default: false },
        { name: 'is_active', type: 'boolean', default: true },
        { name: 'created_at', type: 'timestamptz', default: 'now()' },
        { name: 'updated_at', type: 'timestamptz', default: 'now()' }
      ]
    });
    
    await makeRequest('/rest/v1/rpc/create_table', 'POST', devotionalsData);
    console.log('✅ Tabela devotionals criada!\n');
  } catch (error) {
    console.log(`⚠️  Erro ao criar devotionals: ${error.message}\n`);
  }

  // 2. Tabela user_stats
  try {
    console.log('📊 Criando tabela user_stats...');
    const userStatsData = JSON.stringify({
      name: 'user_stats',
      schema: 'public',
      columns: [
        { name: 'id', type: 'uuid', default: 'gen_random_uuid()', primary_key: true },
        { name: 'user_id', type: 'uuid', references: 'auth.users(id)', nullable: false, unique: true },
        { name: 'current_streak', type: 'integer', default: 0 },
        { name: 'longest_streak', type: 'integer', default: 0 },
        { name: 'last_activity_date', type: 'date' },
        { name: 'total_moments', type: 'integer', default: 0 },
        { name: 'total_minutes', type: 'integer', default: 0 },
        { name: 'spiritual_level', type: 'text', default: 'semente' },
        { name: 'level_progress', type: 'integer', default: 0 },
        { name: 'streak_freezes_available', type: 'integer', default: 1 },
        { name: 'streak_freeze_used_at', type: 'date' },
        { name: 'early_bird_count', type: 'integer', default: 0 },
        { name: 'night_owl_count', type: 'integer', default: 0 },
        { name: 'comeback_count', type: 'integer', default: 0 },
        { name: 'favorite_theme', type: 'text' },
        { name: 'favorite_time', type: 'text' },
        { name: 'created_at', type: 'timestamptz', default: 'now()' },
        { name: 'updated_at', type: 'timestamptz', default: 'now()' }
      ]
    });
    
    await makeRequest('/rest/v1/rpc/create_table', 'POST', userStatsData);
    console.log('✅ Tabela user_stats criada!\n');
  } catch (error) {
    console.log(`⚠️  Erro ao criar user_stats: ${error.message}\n`);
  }

  // 3. Tabela user_achievements
  try {
    console.log('🏆 Criando tabela user_achievements...');
    const userAchievementsData = JSON.stringify({
      name: 'user_achievements',
      schema: 'public',
      columns: [
        { name: 'id', type: 'uuid', default: 'gen_random_uuid()', primary_key: true },
        { name: 'user_id', type: 'uuid', references: 'auth.users(id)', nullable: false },
        { name: 'achievement_key', type: 'text', nullable: false },
        { name: 'achievement_type', type: 'text', nullable: false },
        { name: 'title', type: 'text', nullable: false },
        { name: 'description', type: 'text', nullable: false },
        { name: 'icon', type: 'text', nullable: false },
        { name: 'unlocked_at', type: 'timestamptz', default: 'now()' },
        { name: 'is_new', type: 'boolean', default: true },
        { name: 'created_at', type: 'timestamptz', default: 'now()' }
      ]
    });
    
    await makeRequest('/rest/v1/rpc/create_table', 'POST', userAchievementsData);
    console.log('✅ Tabela user_achievements criada!\n');
  } catch (error) {
    console.log(`⚠️  Erro ao criar user_achievements: ${error.message}\n`);
  }

  // 4. Tabela user_favorites
  try {
    console.log('❤️ Criando tabela user_favorites...');
    const userFavoritesData = JSON.stringify({
      name: 'user_favorites',
      schema: 'public',
      columns: [
        { name: 'id', type: 'uuid', default: 'gen_random_uuid()', primary_key: true },
        { name: 'user_id', type: 'uuid', references: 'auth.users(id)', nullable: false },
        { name: 'devotional_id', type: 'uuid', references: 'public.devotionals(id)' },
        { name: 'favorite_type', type: 'text', nullable: false },
        { name: 'content', type: 'text', nullable: false },
        { name: 'reference', type: 'text' },
        { name: 'tags', type: 'text[]' },
        { name: 'notes', type: 'text' },
        { name: 'created_at', type: 'timestamptz', default: 'now()' },
        { name: 'updated_at', type: 'timestamptz', default: 'now()' }
      ]
    });
    
    await makeRequest('/rest/v1/rpc/create_table', 'POST', userFavoritesData);
    console.log('✅ Tabela user_favorites criada!\n');
  } catch (error) {
    console.log(`⚠️  Erro ao criar user_favorites: ${error.message}\n`);
  }

  // 5. Tabela user_progress
  try {
    console.log('📈 Criando tabela user_progress...');
    const userProgressData = JSON.stringify({
      name: 'user_progress',
      schema: 'public',
      columns: [
        { name: 'id', type: 'uuid', default: 'gen_random_uuid()', primary_key: true },
        { name: 'user_id', type: 'uuid', references: 'auth.users(id)', nullable: false },
        { name: 'devotional_id', type: 'uuid', references: 'public.devotionals(id)' },
        { name: 'completed_at', type: 'timestamptz', default: 'now()' },
        { name: 'duration_minutes', type: 'integer' },
        { name: 'personal_notes', type: 'text' },
        { name: 'personal_prayer', type: 'text' },
        { name: 'used_audio', type: 'boolean', default: false },
        { name: 'completed_all_steps', type: 'boolean', default: true },
        { name: 'device_type', type: 'text' },
        { name: 'created_at', type: 'timestamptz', default: 'now()' }
      ]
    });
    
    await makeRequest('/rest/v1/rpc/create_table', 'POST', userProgressData);
    console.log('✅ Tabela user_progress criada!\n');
  } catch (error) {
    console.log(`⚠️  Erro ao criar user_progress: ${error.message}\n`);
  }

  console.log('🎉 Tentativa de criação das tabelas concluída!');
  console.log('\n📋 Próximos passos:');
  console.log('1. Verificar se as tabelas foram criadas no Supabase Dashboard');
  console.log('2. Se não funcionou, executar o schema manualmente via SQL Editor');
  console.log('3. Testar o app no browser');
}

// Executar
createTables().catch(console.error);
