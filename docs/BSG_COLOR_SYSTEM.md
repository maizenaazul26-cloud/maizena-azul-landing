# Blue Sky Group: sistema cromatico oficial

Fecha de auditoria: 2026-07-25.

## Fuentes verificadas

- `public/favicon.png`: el color dominante opaco es `#066FEE` (578.085 pixeles). El asset tambien
  contiene blanco y dos acentos claros internos que no se trasladan a la interfaz.
- `index.html` y `public/site.webmanifest`: ambos declaran `#066FEE` como `theme-color`.
- El token historico principal de `src/index.css` es `#066FEE`. Los anteriores azules de hover,
  detalle y contraste fueron retirados de la interfaz para evitar divergencias perceptibles.

## Paleta autorizada

| Rol | Valor | Uso |
|---|---|---|
| Azul de marca | `#066FEE` | Fondos principales, CTA y acentos |
| Azul suave | `rgba(6, 111, 238, 0.08)` | Fondos de estado de baja superficie |
| Linea azul | `rgba(6, 111, 238, 0.12)` | Reglas decorativas |
| Borde azul | `rgba(6, 111, 238, 0.28)` | Contornos de estado |
| Tinta | `#0A0A0A` | Texto y superficies oscuras |
| Texto | `#555555` | Cuerpo de lectura |
| Texto tenue | `#888888` | Metadatos |
| Borde | `#DCDFE3` | Divisores y contornos |
| Borde suave | `#E8EAED` | Separadores secundarios |
| Fondo suave | `#EEF0F4` | Bandas alternas |
| Blanco | `#FFFFFF` | Superficies y texto invertido |

## Tokens semanticos

- `--color-brand-primary`
- `--color-brand-primary-hover`
- `--color-brand-primary-active`
- `--color-brand-primary-soft`
- `--color-brand-primary-line`
- `--color-brand-primary-border`
- `--color-brand-primary-shadow`
- `--color-brand-primary-shadow-hover`

Hover y active conservan `#066FEE`; el cambio de estado se expresa mediante transformacion,
contorno o sombra. Las unicas variantes cromaticas son transparencias derivadas del mismo RGB.
No se incorporan gradientes ni otros azules.
