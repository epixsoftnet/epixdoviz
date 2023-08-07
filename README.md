# epixdoviz
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fepixsoftnet%2Fepixdoviz.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fepixsoftnet%2Fepixdoviz?ref=badge_shield)


epixdoviz kütüphanesi ile güncel doviz,altin,borsa,kripto para piyasaların çıktısını verir

## Kütüphane Kullanımı
    const epixdoviz = require('epixdoviz')


#### Genel Piyasa Durumları 
**Döviz,Altın,En Çok Kazandıran Hisseler, Ençok Kaybettiren Hisseler, En Çok İşlem Gören Hisseler, Kripto Paralar, Pariteler ve Emtialar*

    epixdoviz.genel().then(console.log).catch(console.error)

### Serbest Piyasa Döviz Kurları
    epixdoviz.doviz().then(console.log).catch(console.error)

### Piyasa Döviz Kuru Banka Oranları
    epixdoviz.dovizpiyasa('euro').then(console.log).catch(console.error)

### Altın Fiyatları
    epixdoviz.altin().then(console.log).catch(console.error)

### Kripto Paralar
**Günün En Çok Kazandıran Kripto Paraları,Günün En Aktif Kripto Paraları, Tüm Kripto Paralar*

    epixdoviz.kripto().then(console.log).catch(console.error)

### Borsalar
**En Çok Kazandıran Hisseler, En Çok Kaybettiren Hisseler ve En Çok İşlem Gören Hisseler*

    epixdoviz.borsa_genel().then(console.log).catch(console.error)

### Tüm Hisse Senetleri
    epixdoviz.borsa_hisseler().then(console.log).catch(console.error)

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fepixsoftnet%2Fepixdoviz.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fepixsoftnet%2Fepixdoviz?ref=badge_large)