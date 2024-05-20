let secretWord = generateRandomWord();
        let attempts = 6;

        document.getElementById('guessInput').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                checkGuess();
            }
        });

        function generateRandomWord() {
            const words = [
                "macan", "makan", "tutul", "kursi", "lampu", "dunia", "emosi", "makam", "minum", "botol", "paras", "senam", "bunga",
                "venus", "bulan", "jambu", "sunda", "papan", "timur", "barat", "cacat", "china", "eropa", "leher", "siang", "badak", 
                "tiang", "tapir", "sandi", "sabun", "kabel", "kotak", "petak", "perak", "rumah", "tupai", "katak", "setan", "hantu", 
                "keran", "galon", "hujan", "janji", "warna", "kolor", "bibir", "mesin", "tutup", "bukan", "budak", "pulau", "badan", 
                "jalan", "jalur", "hitam", "gelas", "botak", "pacar", "abadi", "mekar", "mawar", "kecoa", "sebut", "injak", "kamar", 
                "merah", "marah", "sedih", "takut", "seram", "remas", "meras", "melas", "beras", "colok", "babak", "masak", "barak", 
                "makin", "kapas", "kapal", "punah", "wahyu", "tanda", "mandi", "keong", "iklan", "papan", "sehat", "cinta", "surat", 
                "pintu", "sekop", "tugas", "kelas", "telur", "angin", "mimpi", "gelar", "tarik", "tahan", "kacau", "tanah", "senja", 
                "tanam", "bekas", "nikah", "judul", "sakit", "jamin", "gurih", "lemak", "serbu", "tenis", "petir", "ujung", "kawin", 
                "menar", "kelam", "repot", "timpa", "dapat", "makan", "pagar", "rakit", "mobil", "tulip", "mimpi", "tiram", "garam", 
                "melah", "berat", "perut", "gugur", "harap", "takut", "kunci", "tunda", "antre", "dewan", "ketat", "kerap", "tinta", 
                "layar", "rakit", "hujan", "lebar", "keras", "akses", "ranum", "keruh", "kerak", "teman", "kuota", "baper", "rajin", 
                "goyah", "tungu", "bakar", "rekam", "surat", "rawan", "tabur", "balut", "lulus", "pukul", "rumit", "tubuh", "bingk", 
                "tuban", "rinci", "sendu", "gagal", "lirik", "merak", "batre", "kuber", "berat", "hukum", "buruk", "pedas", "donga", 
                "cahar", "lawan", "besar", "gosip", "perih", "gosok", "domba", "pintu", "koran", "penat", "semak", "serut", "senin", 
                "lesap", "susah", "sarap", "selai", "sikap", "silau", "sigap", "sikat", "susup", "terim", "tegar", "tugas", "turut", 
                "tusuk", "cetak", "terus", "balon", "bisik", "dasar", "gitar", "gelap", "kubur", "kenal", "karat", "kecil", "lagan", 
                "lunas", "lapar", "larut", "lamat", "lunak", "lurik", "manja", "rusak", "titik", "nasib", "geger", "nomor", "memar", 
                "perih", "ruang", "rokok", "ramah", "salah", "sajak", "sakel", "sakit", "salip", "setia", "senar", "senat", "siksa", 
                "surat", "sutet", "tekad", "takar", "lemah", "tenar", "tutup", "talas", "usang", "umpan", "umpat", "parah", "urung", 
                "usaha", "zaman", "huruf", "lahir", "tenda", "kipas", "kekar", "masuk", "mukul", "ramal", "kekal", "helai", "keren",
                "panel", "musik", "buruh", "lurus", "kurus", "tulus", "kaset", "kasur", "surga", "sigma", "keset", "malam", "kamis",
                "pasar", "tebak", "letak", "robot", "katun", "kusut", "kasti", "sepak", "jujur", "kolam", "kolom", "tabel", "benua",
                "karam", "larik", "puisi", "malas", "benar", "betul", "rusuk", "pedih", "jahat", "pahat", "lemon", "melon", "ketan",
                "lekas", "kebal", "pipih", "pulih", "biola", "marak", "hijau", "pohon", "panah", "waktu", "sukma", "lahar", "iblis",
                "subur", "meler", "lumer", "lebak", "retak", "raket", "melar", "unsur", "pulas", "tidur", "kuota", "pusat", "sutra",
                "manis", "pahit", "hotel", "kemas", "rutin", "bulir", "murid", "pompa", "motor"
            ];

            return words[Math.floor(Math.random() * words.length)];
        }

        function checkGuess() {
            const guessInput = document.getElementById('guessInput');
            const guess = guessInput.value.toLowerCase();
            const feedback = document.getElementById('feedback');
            const attemptsDisplay = document.getElementById('attempts');
            const attemptsList = document.getElementById('attemptsList');

            if (!guess || guess.length !== 5 || !/^[a-zA-Z]+$/.test(guess)) {
                feedback.textContent = "Jawaban gagal, mohon untuk menebak kata dengan 5 huruf";
                return;
            }

            if (guess === secretWord) {
                feedback.innerHTML = `Selamat, kamu menebak katanya: <span class="correct-position">${secretWord.toUpperCase()}</span>`;
                guessInput.disabled = true;
                feedback.style.color = "#5cb85c"; // Warna hijau untuk sukses
            } else {
                const result = getFeedback(secretWord, guess);
                feedback.innerHTML = `Jawaban salah, hasil: ${result}`;
                const listItem = document.createElement('li');
                listItem.innerHTML = `${guess.toUpperCase()}: ${result}`;
                attemptsList.appendChild(listItem);
                attempts--;
                attemptsDisplay.textContent = attempts;
                if (attempts === 0) {
                    feedback.innerHTML = `Kesempatanmu sudah habis, katanya adalah: <span class="correct-position">${secretWord.toUpperCase()}</span>`;
                    guessInput.disabled = true;
                }
            }
            guessInput.value = '';
        }

        function getFeedback(secretWord, guess) {
            let result = '';
            let secretWordCopy = secretWord.slice();
            let guessCopy = guess.slice();

            // Menandai huruf yang tepat dengan kapital
            for (let i = 0; i < secretWord.length; i++) {
                if (secretWord[i] === guess[i]) {
                    result += `<span class="correct-position">${guess[i].toUpperCase()}</span>`;
                    secretWordCopy = replaceAt(secretWordCopy, i, '_'); // Hapus huruf yang sudah cocok
                    guessCopy = replaceAt(guessCopy, i, '_');
                } else {
                    result += `<span class="wrong-letter">*</span>`;
                }
            }

            // Menandai huruf yang ada tapi salah posisi dengan huruf kecil
            for (let i = 0; i < guess.length; i++) {
                if (guessCopy[i] !== '_' && secretWordCopy.includes(guessCopy[i])) {
                    result = result.replace('<span class="wrong-letter">*</span>', `<span class="wrong-position">${guessCopy[i].toUpperCase()}</span>`);
                    secretWordCopy = secretWordCopy.replace(guessCopy[i], '_'); // Hapus huruf yang sudah dipakai
                } else if (guessCopy[i] !== '_') {
                    result = result.replace('<span class="wrong-letter">*</span>', `<span class="wrong-letter">${guessCopy[i].toUpperCase()}</span>`);
                }
            }

            return result;
        }

        function replaceAt(string, index, replacement) {
            return string.substring(0, index) + replacement + string.substring(index + 1);
        }

        function resetGame() {
            secretWord = generateRandomWord();
            attempts = 6;
            document.getElementById('guessInput').disabled = false;
            document.getElementById('guessInput').value = '';
            document.getElementById('feedback').textContent = '';
            document.getElementById('attempts').textContent = attempts;
            document.getElementById('attemptsList').innerHTML = '';
            document.getElementById('feedback').style.color = "#d9534f"; // Reset warna feedback ke merah
        }

        function rateGame(rating) {
            alert(`Terima kasih atas rating ${rating} Anda!`);
        }