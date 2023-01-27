const tabletojson = require('tabletojson').Tabletojson;
const tablejson = async (url,short="") => {
    return new Promise((resolve, reject) => {
        tabletojson.convertUrl(
            url,
            function(tablesAsJson) {
                if(short == "ALL"){
                    resolve(tablesAsJson);
                }else{
                    resolve(tablesAsJson[0]);
                }
            }
        );
    });
}
const langfixer = (str) => {
    return str
        .replace(/ü/g, 'u')
        .replace(/ı/g, 'i')
        .replace(/ğ/g, 'g')
        .replace(/ç/g, 'c')
        .replace(/ö/g, 'o')
        .replace(/ş/g, 's')
}
const getDate = (hourstring) => {

    let date = new Date();

    const hour = hourstring.split(':');
    date.setHours(hour[0]);
    date.setMinutes(hour[1]);

    if (date.getTime() < Date.now()) {
        date.setDate(new Date().getDate() - 1);
    }
    return date.toLocaleString()
};
const Temizle = (data) =>{
    data  = data.replace('.','');
    data  = data.replace(',','.');
    data  = data.replace('$','');
    data  = parseFloat(data);
    return data.toFixed(4);
}
module.exports = {
    genel() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await tablejson('https://www.doviz.com','ALL');

                //Döviz Kurlari
                const Doviz = [];
                data[0].forEach((e) => {
                    Doviz.push({
                        "sembol"    : e["Sembol"],
                        "satis"     : e["Son"],
                        "degisim"   : e["Değişim"],
                        "saat"      : e["3"]
                    })
                })
                //Altın Kurlari
                const Altin = [];
                data[1].forEach((e) => {

                    Altin.push({
                        "sembol"    : e["Sembol"],
                        "satis"     : Temizle(e["Son"]),
                        "degisim"   : e["Değişim"],
                        "saat"      : e["3"]
                    })
                })
                //En Çok Kazandıran Hisseler
                const KazananHisseler = [];
                data[2].forEach((e) => {
                    KazananHisseler.push({
                        "sembol"    : e["Sembol"],
                        "son"       : e["Son"],
                        "degisim"   : e["Değişim"],
                        "saat"      : e["3"]
                    })
                })
                //En Çok Kaybettiren Hisseler
                const KaybedenHisseler = [];
                data[3].forEach((e) => {
                    KaybedenHisseler.push({
                        "sembol"    : e["Sembol"],
                        "son"       : e["Son"],
                        "degisim"   : e["Değişim"],
                        "saat"      : e["3"]
                    })
                })
                //En Çok İşlem Gören Hisseler
                const IslemHisseler = [];
                data[4].forEach((e) => {
                    IslemHisseler.push({
                        "sembol"    : e["Sembol"],
                        "son"       : e["Son"],
                        "hacim"     : e["Hacim"],
                        "saat"      : e["3"]
                    })
                })
                //Kripto Paralar
                const Kripto = [];
                const usd    = (Doviz[0]["satis"]);
                data[5].forEach((e) => {
                    Kripto.push({
                        "sembol"    : e["Sembol"],
                        "usd"       : Temizle(e["Son"]),
                        "try"       : (Temizle(e["Son"])*usd).toFixed(2),
                        "degisim"   : e["Değişim"],
                        "saat"      : e["3"]
                    })
                })
                //Pariter
                const Pariter = [];
                data[6].forEach((e) => {
                    Pariter.push({
                        "sembol"    : e["Sembol"],
                        "alis"      : e["Alış"],
                        "degisim"   : e["Değişim"],
                        "saat"      : e["3"]
                    })
                })
                //Pariter
                const Emtia = [];
                data[7].forEach((e) => {
                    Emtia.push({
                        "sembol"    : e["Sembol"],
                        "usd"       : Temizle(e["Son"]),
                        "try"       : (Temizle(e["Son"])*usd).toFixed(2),
                        "degisim"   : e["Değişim"],
                        "saat"      : e["3"]
                    })
                })

                const newData = [];
                newData.push({
                    "doviz" : {
                        "adi"       : 'Döviz Kurlari',
                        "data"      : JSON.stringify(Doviz)
                    },
                    "altin" : {
                        "adi"       : 'Altın Kurlari',
                        "data"      : JSON.stringify(Altin)
                    },
                    "kazanan_hisseler" : {
                        "adi"       : 'En Çok Kazandıran Hisseler',
                        "data"      : JSON.stringify(KazananHisseler)
                    },
                    "kaybeden_hisseler" : {
                        "adi"       : 'En Çok Kaybettiren Hisseler',
                        "data"      : JSON.stringify(KaybedenHisseler)
                    },
                    "islem_goren_hisseler" : {
                        "adi"       : 'En Çok İşlem Gören Hisseler',
                        "data"      : JSON.stringify(IslemHisseler)
                    },
                    "kripto" : {
                        "adi"       : 'Kripto Paralar',
                        "data"      : JSON.stringify(Kripto)
                    },
                    "pariter" : {
                        "adi"       : 'Pariteler',
                        "data"      : JSON.stringify(Pariter)
                    },
                    "emtia" : {
                        "adi"       : 'Emtialer',
                        "data"      : JSON.stringify(Emtia)
                    }
                })


                resolve(newData)

            } catch (error) {
                reject(error);
            }
        });
    },
    doviz() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await tablejson('https://kur.doviz.com');
                const newData = [];
                data.forEach((e) => {
                    const name = e[0].split('\n');
                    isim = name[1].replaceAll('  ','');
                    newData.push({
                        kur: name[0], //
                        isim: isim, //
                        alis: e["Alış"],
                        satis: e["Satış"],
                        yuksek: e["Yüksek"],
                        dusuk: e["Düşük"],
                        degisim: e["Değişim"],
                        tarih: (getDate(e["6"]))
                    })
                })
                resolve(newData)

            } catch (error) {
                reject(error);
            }
        });
    },
    dovizpiyasa(piyasa) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await tablejson(`https://kur.doviz.com/serbest-piyasa/${piyasa}`,'ALL');
                const Degisim = [];
                data[0].forEach((e) => {
                    Degisim.push({
                        haftalik: e['Haftalık'],
                        aylik: e["Aylık"],
                        yillik: e["Yıllık"]
                    })
                })
                const Banka = [];
                data[1].forEach((e) => {
                    Banka.push({
                        banka: e['Banka'],
                        alis: e["Alış"],
                        satis: e["Satış"]
                    })
                })
                const newData = [{
                    "degisim"   : JSON.stringify(Degisim),
                    "bankalar"  : JSON.stringify(Banka)
                }];
                resolve(newData)

            } catch (error) {
                reject(error);
            }
        });
    },
    altin() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await tablejson('https://altin.doviz.com/');
                const newData = [];
                data.forEach((e) => {
                    const name = e["0"];
                    const kur = langfixer(name.toLowerCase().replace(/ /g,'-'));
                    newData.push({
                        kur: kur,
                        isim: name,
                        alis: e["Alış"],
                        satis: e["Satış"],
                        degisim: e["Değişim"],
                        tarih: getDate(e["4"])
                    })
                })
                resolve(newData);
            } catch (error) {
                reject(error);
            }
        });
    },
    kripto() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await tablejson('https://www.doviz.com/kripto-paralar','ALL');

                const Kazanan = [];
                data[0].forEach((e) => {
                    Kazanan.push({
                        kur: e[0],
                        satis_usd: e["Son"],
                        degisim : e["Değişim"]
                    })
                })

                const Aktif = [];
                data[1].forEach((e) => {
                    Aktif.push({
                        kur: e[0],
                        satis_usd: e["Son"],
                        degisim : e["Değişim"]
                    })
                })


                const Kripto = [];
                data[2].forEach((e) => {
                    const ext  = e["0"].split('\n');
                    const name = ext["0"].split(' - ');
                    if(name[0]){
                        Kripto.push({
                            kur: name[0],
                            isim: name[1],
                            satis_usd: e["Satış($)"],
                            satis_try: e["Satış(₺)"],
                            piyasa: e["Piyasa Değeri"],
                            hacim_gunluk: e["Hacim(24s)"],
                            degisim : e["Değişim"],
                            tarih: getDate(e["6"])
                        })
                    }
                })

                const newData = [{
                    kazanan : {
                        "adi"   : 'Günün En Çok Kazandıran Kripto Paraları',
                        "data"  : JSON.stringify(Kazanan)
                    },
                    aktif : {
                        "adi"   : 'Günün En Aktif Kripto Paraları',
                        "data"  : JSON.stringify(Aktif)
                    },
                    kripto : {
                        "adi"   : 'Kripto Paraları',
                        "data"  : JSON.stringify(Kripto)
                    }
                }]

                resolve(newData)
            } catch (error) {
                reject(error);
            }
        });
    },
    borsa_genel() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await tablejson('https://borsa.doviz.com/','ALL');
                const Kazanan = [];
                data[0].forEach((e) => {
                    const name = e["Sembol"].split(' - ');
                    Kazanan.push({
                        kur: name[0],
                        isim: name[1],
                        alis: e["Alış"],
                        degisim : getDate(e["Güncelleme"])
                    })
                })

                const Kaybeden = [];
                data[1].forEach((e) => {
                    const name = e["Sembol"].split(' - ');
                    Kaybeden.push({
                        kur: name[0],
                        isim: name[1],
                        alis: e["Alış"],
                        degisim : getDate(e["Güncelleme"])
                    })
                })

                const Islem = [];
                data[2].forEach((e) => {
                    const name = e["Sembol"].split(' - ');
                    Islem.push({
                        kur: name[0],
                        isim: name[1],
                        alis: e["Alış"],
                        degisim : getDate(e["Güncelleme"])
                    })
                })


                const newData = [{
                    kazandiran : {
                        "adi"   : 'En Çok Kazandıran Hisseler',
                        "data"  : JSON.stringify(Kazanan)
                    },
                    kaybeden : {
                        "adi"   : 'En Çok Kaybettiren Hisseler',
                        "data"  : JSON.stringify(Kaybeden)
                    },
                    islem_goren : {
                        "adi"   : 'En Çok İşlem Gören Hisseler',
                        "data"  : JSON.stringify(Islem)
                    }
                }]

                resolve(newData)

            } catch (error) {
                reject(error);
            }
        });
    },
    borsa_hisseler() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await tablejson('https://borsa.doviz.com/hisseler');
                const newData = [];
                data.forEach((e) => {
                    const name = e[0].split(' - ');
                    newData.push({
                        sembol      : name[0],
                        isim        : name[1],
                        kapanis     : e["Son"],
                        en_yuksek   : e["En Yüksek"],
                        en_dusuk    : e["Hacim(TL)"],
                        degisim     : e["Değişim"],
                        tarih       : getDate(e[6]),
                    })
                })

                resolve(newData)

            } catch (error) {
                reject(error);
            }
        });
    }
}
