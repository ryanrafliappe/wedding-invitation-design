const audio = document.getElementById('backgroundMusic');
const content = document.getElementById('main');
const form = document.getElementById('commentForm');
const commentContainer = document.getElementById('commentContainer');

document.addEventListener('DOMContentLoaded', () => {

    // opening content from cover
    document.getElementById('openBtn').addEventListener('click', function () {
        // sliding cover
        document.getElementById('cover').classList.add('hidden');

        // showing button toggle audio and playing audio
        document.getElementById('audioSection').classList.remove('hidden');
        audio.play();

        // remove overflow for content
        document.getElementById('content').classList.remove('overflow');
    });

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

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Memanggil fungsi pada saat halaman dimuat untuk memeriksa elemen yang sudah terlihat

    // countdown timer
    let countingDown = setInterval(function() {
        // countdown date and time
        const cdDate = new Date(countdownDate).getTime();

        // get today's date and time
        let now = new Date().getTime();

        // find distance between now and the countdown date
        let distance = cdDate - now;

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

    // get data comments
    const getDataComments = () => {
        fetch('/comments', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            let renderHtml = '';
            data.forEach((comment) => {
                renderHtml += renderComment(comment.name, comment.message);
            });

            commentContainer.innerHTML = renderHtml;
            document.getElementById('commentLength').innerText = data.length;
        }).catch(error => console.error(error));
    }
    getDataComments();

    // save new comment
    form.addEventListener('submit', function( event ) {
        event.preventDefault();

        const formData = new FormData(form);
        const urlEncodedData = new URLSearchParams(formData).toString();
        // console.log(urlEncodedData);

        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlEncodedData
        })
        .then(response => response.json())
        .then(data => {
            form.reset();
            getDataComments();
        })
        .catch(error => console.error(error));
    });

    // audio toggle
    document.getElementById('toggleAudioBtn').addEventListener('click', function () {
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
    // document
    //     .getElementById('giftBtn')
    //     .addEventListener('click', function() {
    //         const giftHidden = document.getElementById('giftSection');
    //         giftHidden.classList.toggle('show');
    //     });

    // copy data
    // document
    //     .querySelectorAll('.copy')
    //     .forEach(function(btn) {
    //         btn.addEventListener('click', function() {
    //             let data = this.getAttribute('data-id');
    //             let dataCopy = '';
    //             let btnText = '';
    //             switch (data) {
    //                 case 'bank1':
    //                     dataCopy = weddingData.gift.bank1.norek;
    //                     btnText = 'Salin Nomor Rekening';
    //                     break;
    //                 case 'bank2':
    //                     dataCopy = weddingData.gift.bank2.norek;
    //                     btnText = 'Salin Nomor Rekening';
    //                     break;
    //                 case 'alamat':
    //                     dataCopy = `Penerima: ${weddingData.gift.alamat.penerima} (${weddingData.gift.alamat.notelp}) ${weddingData.gift.alamat.alamat}`;
    //                     btnText = 'Salin Alamat';
    //                     break;
    //                 default:
    //                     break;
    //             }

    //             navigator.clipboard.writeText(dataCopy).then(function() {
    //                 btn.innerText = 'Berhasil disalin!';
    //                 setTimeout(function() {
    //                     btn.innerText = btnText;
    //                 }, 2000);
    //             }).catch(function(err) {
    //                 console.error('Gagal menyalin teks: ', err);
    //             });
    //         });
    //     });

    function padZero(number) {
        if (number >= 10 ) {
            return number;
        } else if ( number < 1 ) {
            return `00`;
        } else {
            return `0${number}`;
        }
    }

    const renderComment = (name, message) => {
        return `<div class="message-container">
                    <div class="comment-icon">
                        <img src="./assets/chat.png" alt="chat icon">
                    </div>
                    <div>
                        <p class="comment-name">${ name }</p>
                        <p>${ message }</p>
                    </div>
                </div>`
    }
});
