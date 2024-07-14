const weddingData = {
    groom: {
        panggilan: 'Bayao',
        lengkap: 'Bayazid Sustami M.N., ST',
        anakKe: 'Pertama',
        ayah: 'Fulan bin Fulan',
        ibu: 'Fulanah binti Fulan'
    },
    bride: {
        panggilan: 'Dae',
        lengkap: 'Dila Amalia, ST',
        anakKe: "Kedua",
        ayah: 'Fulan bin Fulan',
        ibu: 'Fulanah binti Fulan'
    },
    event: {
        countdownDate: "2024-07-15 23:59:59",
        akad: {
            hari: 'Jumat',
            tanggal: '29-01-2020',
            jam: '10.00 WITA',
            tempat: 'Jl. Moh. Paleo 3, Antang, Kec. Manggala, Kota Makassar, Sulawesi Selatan 90234',
            maps: ''
        },
        resepsi: {
            hari: 'Jumat',
            tanggal: '29-01-2025',
            jam: '13.00 WITA - Selesai',
            tempat: 'Jl. Moh. Paleo 3, Antang, Kec. Manggala, Kota Makassar, Sulawesi Selatan 90234',
            maps: ''
        },
    },
    gift: {
        bank1: {
            nama: 'Bayazid Sustami Mohammad Nasir',
            norek: '0123458725389'
        },
        bank2: {
            nama: 'Dila Amalia Ervin',
            norek: '23473985723874'
        },
        alamat: {
            penerima: 'Fulan bin Fulan',
            notelp: '0812-3456-7890',
            alamat: 'Jl. Moh. Paleo 3, Antang, Kec. Manggala, Kota Makassar, Sulawesi Selatan 90234'
        }
    }
};
const audio = document.getElementById('backgroundMusic');
const content = document.getElementById('main');

document.addEventListener('DOMContentLoaded', () => {
    // setting data
    document.getElementById('homeGroom').innerText = weddingData.groom.panggilan;
    document.getElementById('homeBride').innerText = weddingData.bride.panggilan;
    document.getElementById('coupleGroom').innerText = weddingData.groom.lengkap;
    document.getElementById('coupleGroomInfo').innerText = `( Putra ${weddingData.groom.anakKe} Bpk. ${weddingData.groom.ayah} & Ibu ${weddingData.groom.ibu} )`;
    document.getElementById('coupleBride').innerText = weddingData.bride.lengkap;
    document.getElementById('coupleBrideInfo').innerText = `( Putri ${weddingData.bride.anakKe} Bpk. ${weddingData.bride.ayah} & Ibu ${weddingData.bride.ibu} )`;
    document.getElementById('eventAkadDay').innerText = weddingData.event.akad.hari;
    document.getElementById('eventAkadDate').innerText = weddingData.event.akad.tanggal;
    document.getElementById('eventAkadTime').innerText = weddingData.event.akad.jam;
    document.getElementById('eventAkadAddress').innerText = weddingData.event.akad.tempat;
    document.getElementById('eventAkadMaps').href = weddingData.event.akad.maps;
    document.getElementById('eventReceptionDay').innerText = weddingData.event.resepsi.hari;
    document.getElementById('eventReceptionDate').innerText = weddingData.event.resepsi.tanggal;
    document.getElementById('eventReceptionTime').innerText = weddingData.event.resepsi.jam;
    document.getElementById('eventReceptionAddress').innerText = weddingData.event.resepsi.tempat;
    document.getElementById('eventReceptionMaps').href = weddingData.event.resepsi.maps;
    document.getElementById('giftBank1Name').innerText = weddingData.gift.bank1.nama;
    document.getElementById('giftBank1Number').innerText = weddingData.gift.bank1.norek;
    document.getElementById('giftBank2Name').innerText = weddingData.gift.bank2.nama;
    document.getElementById('giftBank2Number').innerText = weddingData.gift.bank2.norek;
    document.getElementById('giftReceiver').innerText = `${weddingData.gift.alamat.penerima} (${weddingData.gift.alamat.notelp})`;
    document.getElementById('giftAddress').innerText = weddingData.gift.alamat.alamat;
    document.getElementById('thanksName').innerText = `${weddingData.groom.panggilan} & ${weddingData.bride.panggilan}`;
    
    // animate object
    const boxes = document.querySelectorAll('.anim');
    const checkVisibility = () => {
        const triggerBottom = window.innerHeight / 5 * 4;

        boxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                box.classList.add('anim-visible');
                box.classList.remove('anim-hidden'); // Menghapus kelas hidden jika ada
            } else {
                box.classList.remove('anim-visible'); // Menghapus kelas visible jika ada
                box.classList.add('anim-hidden'); // Uncomment jika ingin menambahkan kelas hidden kembali
            }
        });
    };

    // content.addEventListener('scroll', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Memanggil fungsi pada saat halaman dimuat untuk memeriksa elemen yang sudah terlihat
});


// opening content from cover
document.getElementById('openBtn').addEventListener('click', function () {
    // sliding cover
    document.getElementById('cover').classList.add('hidden');

    // showing button toggle audio and playing audio
    document.getElementById('toggleAudioBtn').classList.remove('hidden');
    audio.play();

    // remove overflow for content
    document.getElementById('content').classList.remove('overflow');
});

// countdown timer
let countingDown = setInterval(function() {
    // countdown date and time
    const countdownDate = new Date(weddingData.event.countdownDate).getTime();

    // get today's date and time
    let now = new Date().getTime();

    // find distance between now and the countdown date
    let distance = countdownDate - now;

    // get number of days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // output the results
    document.getElementById('days').innerText = padZero(days);
    document.getElementById('hours').innerText = padZero(hours);
    document.getElementById('minutes').innerText = padZero(minutes);
    document.getElementById('seconds').innerText = padZero(seconds);

    if (distance < 0) {
        clearInterval(countingDown);
    }
}, 1000);

// audio toggle
document
    .getElementById('toggleAudioBtn')
    .addEventListener('click', function () {
        const audioIcon = this.querySelector('img');
        if (audio.paused) {
            audio.play();
            // this.innerText = 'playing..';
            audioIcon.src = 'assets/pause-btn.svg';
        } else {
            audio.pause();
            audioIcon.src = 'assets/play-btn.svg';
        }
    });

// btn show gift
document
    .getElementById('giftBtn')
    .addEventListener('click', function() {
        const giftHidden = document.getElementById('giftSection');
        giftHidden.classList.toggle('show');
    });

// copy data
document
    .querySelectorAll('.copy')
    .forEach(function(btn) {
        btn.addEventListener('click', function() {
            let data = this.getAttribute('data-id');
            let dataCopy = '';
            let btnText = '';
            switch (data) {
                case 'bank1':
                    dataCopy = weddingData.gift.bank1.norek;
                    btnText = 'Salin Nomor Rekening';
                    break;
                case 'bank2':
                    dataCopy = weddingData.gift.bank2.norek;
                    btnText = 'Salin Nomor Rekening';
                    break;
                case 'alamat':
                    dataCopy = `Penerima: ${weddingData.gift.alamat.penerima} (${weddingData.gift.alamat.notelp}) ${weddingData.gift.alamat.alamat}`;
                    btnText = 'Salin Alamat';
                    break;
                default:
                    break;
            }

            navigator.clipboard.writeText(dataCopy).then(function() {
                btn.innerText = 'Berhasil disalin!';
                setTimeout(function() {
                    btn.innerText = btnText;
                }, 2000);
            }).catch(function(err) {
                console.error('Gagal menyalin teks: ', err);
            });
        });
    });

function padZero(number) {
    if (number >= 10 ) {
        return number;
    } else if ( number < 1 ) {
        return `00`;
    } else {
        return `0${number}`;
    }
}