import React, {Component} from 'react';

class Canvas extends Component {
    constructor() {
        super();
        this.canvas = React.createRef();
    }

    componentDidMount() {
        let canvasEl = this.canvas.current;
        let ctx = canvasEl.getContext('2d');
        let r = 41, g = 182, b = 246;
        let baseR = 79, baseG = 195, baseB = 247;

        canvasEl.width = canvasEl.clientWidth;
        canvasEl.height = canvasEl.clientHeight;

        const MAX_NUMBER = 500;

        let snowList = [];

        let flag = 0.1;

        window.onresize = function () {
            canvasEl.width = canvasEl.clientWidth;
            canvasEl.height = canvasEl.clientHeight;
        };

        function getRgb(r, g, b) {
            return "rgb(" + r + "," + g + "," + b + ")";
        }

        function createSnow(e) {
            const snowRadius = Math.random() * 8;
            const snow = {
                posx: e + Math.random() - Math.random(),
                posy: -50 * Math.random(),
                radius: snowRadius,
            };
            snowList.push(snow);
        }

        window.requestAnimationFrame(update);

        function update() {
            createSnow(Math.random() * canvasEl.width);
            render();
            window.requestAnimationFrame(update);
        }

        function calculateRGBColor(color, baseColor) {
            return color + flag * Math.round(baseColor / 100)
        }

        function render() {
            if (Math.round(r) === -10 || Math.round(r) === baseR) {
                flag = -flag
            }
            r = calculateRGBColor(r, baseR);
            g = calculateRGBColor(g, baseG);
            b = calculateRGBColor(b, baseB);
            ctx.fillStyle = getRgb(r, g, b);
            ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

            snowList.forEach(function (snow) {
                let endLine = canvasEl.clientHeight - Math.random() * canvasEl.clientHeight / 5;
                if (snow.posy + 5 < endLine) {
                    snow.posx += 0.1 * Math.floor(Math.random() * 3 - 1);
                    snow.posy += 2 * Math.random() + 3;
                }
                else if (snow.posy + 2 < endLine) {
                    snow.posy += Math.random();
                }

                ctx.strokeStyle = "#EEEEEE";
                ctx.beginPath();
                ctx.arc(snow.posx, snow.posy, snow.radius * 0.8, 0, 2 * Math.PI);
                ctx.fillStyle = "#EEEEEE";
                ctx.fill();
                ctx.stroke();

                ctx.strokeStyle = "#fff";
                ctx.beginPath();
                ctx.arc(snow.posx, snow.posy, snow.radius * 0.5, 0, 2 * Math.PI);
                ctx.fillStyle = "#fff";
                ctx.fill();
                ctx.stroke();
            });
            if (snowList.length > MAX_NUMBER) {
                snowList.shift()
            }
        }
    }

    render() {
        return (<canvas ref={this.canvas}/>)
    }
}

export default Canvas