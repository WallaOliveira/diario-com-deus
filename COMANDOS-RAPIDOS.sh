#!/bin/bash
# 🚀 Script de Instalação Rápida - Diário com Deus

echo "📖 Diário com Deus - Instalação Rápida"
echo "======================================"
echo ""

# Verificar se está na pasta certa
if [ ! -f "package.json" ]; then
    echo "❌ ERRO: Execute este script na pasta do projeto!"
    echo "   Use: cd /tmp/diario-com-deus"
    exit 1
fi

echo "✅ Pasta correta detectada!"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo ""
echo "✅ Dependências instaladas!"
echo ""

# Criar .env.local se não existir
if [ ! -f ".env.local" ]; then
    echo "⚙️  Criando arquivo de configuração..."
    cat > .env.local << 'EOF'
# Configuração temporária (sem autenticação real)
# Para ter autenticação funcionando, veja GUIA-RAPIDO.md

NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-key-for-demo-only
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF
    echo "✅ Arquivo .env.local criado!"
    echo ""
    echo "⚠️  ATENÇÃO: Modo de demonstração ativado"
    echo "   - Login/registro NÃO funcionarão"
    echo "   - Design e navegação funcionam 100%"
    echo "   - Para ativar autenticação: veja GUIA-RAPIDO.md"
    echo ""
else
    echo "✅ Arquivo .env.local já existe!"
    echo ""
fi

echo "======================================"
echo "🎉 Instalação concluída!"
echo "======================================"
echo ""
echo "Para rodar o app:"
echo "  npm run dev"
echo ""
echo "Depois acesse: http://localhost:3000"
echo ""
echo "📱 Para ver no celular:"
echo "  1. Veja o IP no terminal (exemplo: http://192.168.0.15:3000)"
echo "  2. Acesse esse IP no celular (mesma rede Wi-Fi)"
echo ""
echo "📚 Documentação:"
echo "  - COMO-VISUALIZAR.md → Ver funcionando rápido"
echo "  - GUIA-RAPIDO.md → Configuração completa"
echo "  - RESUMO-EXECUTIVO.md → Visão geral do projeto"
echo ""
echo "Bom trabalho! 💙"

