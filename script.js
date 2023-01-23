window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d', {
        willReadFrequently: true
    });
    //canvas nastaví pozadí stránky přes celé
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        //tato classa bude brát z toho co je v té závorce před constructor
        constructor(effect, x, y, color) {
            //Zde jsou proměnné s hodnotami
            this.effect = effect;
            //to zapůsobí random animaci
            this.x = Math.random() * this.effect.canvasWidth;
            this.y = this.effect.canvasHeight;
            this.color = color;
            //souřadnice
            this.originX = x;
            this.originY = y;
            this.size = this.effect.gap;
            this.dx = 0;
            this.dy = 0;
            this.vx = 0;
            this.vy = 0;
            this.force = 0;
            this.angle = 0;
            this.distance = 0;
            //Díky téhlé kombinaci s hodnotami rozhodne jak se partikle budou animovat a pohybovat při kurzoru
            this.friction = Math.random() * 0.6 + 0.15;
            this.ease = Math.random() * 0.1 + 0.005;
        }
        draw() {
            //rozhoduje o tom jestli barva je stejná nebo odlišná od toho particle předtím
            this.effect.context.fillStyle = this.color;
            //čtverečky, které reprezentují particle
            this.effect.context.fillRect(this.x, this.y, this.size, this.size);
        }
        
        update() {
            //Kdyz kurzor prejede pres pismo, pismo se promeni na particli
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distance = this.dx * this.dx + this.dy * this.dy;
            this.force = this.effect.mouse.radius / this.distance;
              //pokud se dostane k té blízkosti kurzoru, tak se rozletí
            if (this.distance < this.effect.mouse.radius) {
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }
            //zařídí odkud půjdou partikly a pokud pujde přes text kurzor aby se particle vrátili
            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        }
    }

    class Effect {
        //Tady je nastaveni textu, kde je, velikost fontu, v jake vysce bude pismo psano
        constructor(context, canvasWidth, canvasHeight) {
            this.context = context;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.textX = this.canvasWidth / 2;
            this.textY = this.canvasHeight / 2;
            //Jaký bude velký fond
            this.fontSize = 150;
            //jaká bude mezera mezi řádkami
            this.lineHeight = this.fontSize * 1;
            //maximální šířka písma
            this.maxTextWidth = this.canvasWidth * 0.8;
            this.textInput = document.getElementById('textInput');
            this.verticalOffset = -0;
            this.textInput.addEventListener('keyup', (e) => {

                if (e.key !== '') {
                    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                    this.wrapText(e.target.value);
                }
            });
            //partikli v textu
            this.particles = [];
            //velikost jednotlivých particlů
            this.gap = 3;
            //pokud se kurzor přiblíží k písmu, pixely se roletí
            this.mouse = {
                //vzdálenost
                radius: 20000,
                x: 0,
                y: 0
            }
            //ukládá hodnoty kurzoru
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            });
        }
        //centrování a víceřádkového textu na HTML canvas
        wrapText(text) {
            //nastavení canvasu (textu, kde se bude nacházet, jakou velikost, jaký font, jak bude barevný)
            const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
            //Barvy textu a jaká barva BeforeUnloadEvent, jak dlouhá
            gradient.addColorStop(0.3, 'purple');
            gradient.addColorStop(0.4, 'darkblue');
            gradient.addColorStop(0.7, 'lightblue');
            //zařizuje to, že barvy budou rozmíchané
            this.context.fillStyle = gradient;
            this.context.textAlign = 'center';
            //
            this.context.textBaseline = 'middle';
            this.context.lineWidth = 3;
            //barva okraje
            this.context.strokeStyle = 'white';
            //vzdálenost mezi písmeny
            this.context.letterSpacing = '5px';
            //font
            this.context.font = this.fontSize + 'px Banger';
            //několika tvořivé řádkování
            let linesArray = [];
            //proměné
            let words = text.split('');
            let lineCounter = 0;
            let line = '';
            //pokud text přesáhne hranici, kde může text psát, tak udělá mezeru na nový řádek
            for (let i = 0; i < words.length; i++) {
                let testLine = line + words[i] + '';
                if (this.context.measureText(testLine).width > this.maxTextWidth) {
                    line = words[i] + ' ';
                    lineCounter++;
                } else {
                    line = testLine;
                }
                linesArray[lineCounter] = line;
            }
            let textHeight = this.lineHeight * lineCounter;
            this.textY = this.canvasHeight / 2 - textHeight / 2 + this.verticalOffset;
            linesArray.forEach((el, index) => {
                //zařídí mezery mezi slovy, a že bude uprostřed za pomocí souřadnicí aby se text nepsal na sobě
                this.context.fillText(el, this.textX, this.textY + (index * this.lineHeight));
                this.context.strokeText(el, this.textX, this.textY + (index * this.lineHeight));
            });
            this.convertToParticles();
        }
        //pixely
        convertToParticles() {
            this.particles = [];
            //tato methoda vráti obraz vždy zpět, jak vypadal předtím
            const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
            //pixeli tvoří písmo
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            //projde všechny pixely
            for (let y = 0; y < this.canvasHeight; y += this.gap) {
                for (let x = 0; x < this.canvasWidth; x += this.gap) {
                    //pozice, kde se budou nacházet
                    const index = (y * this.canvasWidth + x) * 4;
                    const alpha = pixels[index + 3];
                    //pokud je alpha větší vytvoří pixel toho obrázku(textu), s těmihle barvami
                    if (alpha > 0) {
                        const red = pixels[index];
                        const green = pixels[index + 1];
                        const blue = pixels[index + 2];
                        const color = 'rgb(' + red + ',' + green + ',' + blue + ')';
                        this.particles.push(new Particle(this, x, y, color));

                    }
                }
            }
        }
        render() {
            //vyvolá funkce update a draw
            this.particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
        }
        //bude reagovat na zmenšování a zvětšování okna a bude to opravovat aby šel vidět text
        resize(width, height){
            this.canvasWidth = width;
            this.canvasHeight = height;
            this.textX = this.canvasWidth / 2;
            this.textY = this.canvasHeight / 2;
            this.maxTextWidth = this.canvasWidth * 0.8;
        }
    }

    const effect = new Effect(ctx, canvas.width, canvas.height);
    //Uvodni text na strance
    effect.wrapText('Vítej na téhle stránce!');
    //vytvoří particle
    effect.render();

    function animate() {
        //vyčistí partikly, spojí je a proces funguje pořád do kola, že se snaží spojit do hromady
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.render();
        //začne animovat
        requestAnimationFrame(animate);
    }
    //animace pro to aby byl responzivní text
    animate();
    this.window.addEventListener('resize', function(){
        canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
    effect.wrapText(effect.textInput.value);
    });
});
