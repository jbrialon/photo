# 📷

> Tentative to make a dynamic portfolio, tumblr theme looking, powered with VueJS

## Build Setup

```bash
# create photos.json
npm run export

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Optimize gif

```bash
# install gifsicle
brew install gifsicle

# go into .gif folder
cd public/img/

# run command
gifsicle --batch -O3 --lossy=80 meta_share_albumname.gif

--batch: Modifies the GIF file in place (doesn't create a new file).
-O3: Applies the highest level of optimization.
--lossy=80: Compresses the GIF using a lossy compression with a factor of 80.

```
