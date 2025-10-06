# 🎨 Ícones PWA - Como Criar

Os ícones do PWA precisam ser criados para que o app seja instalável no celular.

## 📋 Ícones Necessários

1. **icon-192.png** (192x192 pixels)
2. **icon-512.png** (512x512 pixels)
3. **favicon.ico** (32x32 pixels)

## 🎨 Design Sugerido

### Conceito:
- Fundo gradiente (laranja #cc3f39 → vermelho #ab2f2f)
- Cruz ou Bíblia no centro (branco)
- Bordas arredondadas (20% border-radius)

### Ferramenta Recomendada:
[**Canva**](https://canva.com) (gratuito)

1. Crie design 512x512px
2. Fundo: gradiente laranja → vermelho
3. Adicione emoji: ✝️ (ou 📖)
4. Exporte como PNG

## ⚡ Geradores Automáticos

### Opção 1: RealFaviconGenerator
[realfavicongenerator.net](https://realfavicongenerator.net/)

1. Faça upload da imagem 512x512
2. Gera automaticamente todos tamanhos
3. Baixe o pacote e cole na pasta `public/`

### Opção 2: Favicon.io
[favicon.io](https://favicon.io/)

- Gera favicons de texto, emoji ou imagem
- Super rápido!

## 📦 Onde Colocar

Após criar, coloque os arquivos aqui:

```
public/
├── icon-192.png    ← Aqui
├── icon-512.png    ← Aqui
└── favicon.ico     ← Aqui
```

## 🧪 Testar

1. Rode o app: `npm run dev`
2. Abra no celular
3. Menu → "Adicionar à tela inicial"
4. Veja se o ícone aparece corretamente

## 🎯 Placeholder Temporário

Por enquanto, o app funciona SEM os ícones (vai mostrar ícone padrão do browser).

Mas para produção, **PRECISA** ter os ícones!

---

**Dúvidas?** Veja tutorial completo: [web.dev/add-manifest](https://web.dev/add-manifest/)

