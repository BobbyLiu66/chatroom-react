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

        let dropList = [];

        let flag = 0.1;

        // each drop is a line
        let lineList = [];

        // mouse position
        let mousePos = [0, 0];

        // radius of mouse position
        let mouseDis = 35;

        // line number of drop line
        let lineNum = Math.round(-10 / 255 * r + 10);

        // the speed of changing the direction of drop with mouse position
        let speedX = 0;

        // the maximum of changing speed
        let maxSpeedX = 0;

        window.onresize = function () {
            canvasEl.width = canvasEl.clientWidth;
            canvasEl.height = canvasEl.clientHeight;
        };

        window.onmousemove = function (e) {
            //get mouse position
            mousePos[0] = e.clientX;
            mousePos[1] = e.clientY;

            // 通过鼠标位置，设置 maxspeedx的值，取值范围是 -1 到 1
            // maxspeedx的值，关系到
            // 1、雨滴的方向
            // 2、雨滴下落的方向
            // 3、雨滴下落方向 跟随 鼠标移动方向变化的速度
            // 4、小水珠的移动方向
            // 值越接近1，表示方向越向右
            // 值越接近-1，表示方向越向左
            maxSpeedX = (e.clientX - canvasEl.clientWidth / 2) / (canvasEl.clientWidth / 2);
        };

        function getRgb(r, g, b) {
            return "rgb(" + r + "," + g + "," + b + ")";
        }

        // draw the drop rain
        function createLine(e) {
            // drop rain length
            const dropLength = 0.25 * (50 + Math.random() * 100);
            // 一个 line 对象，代表一个雨滴
            const line = {
                // 雨滴下落速度
                speed: 5.5 * (Math.random() * 6 + 3),
                // 判断是否删除，值为true就删除
                die: false,
                // 雨滴x坐标
                posx: e,
                // 雨滴y坐标
                posy: -50,
                // 雨滴的长度
                h: dropLength,
                // 雨滴的颜色
                color: getRgb(255 - r, 255 - g, 255 - b)
            };
            // 把创建好的line（雨滴）对象，添加到保存雨滴的数组
            lineList.push(line);
        }

        // 画一个小水珠（雨滴散开后的小水珠就是一个个的圆弧）
        function createDrop(x, y) {
            // 一个 drop 对象，代表一个圆弧
            return {
                // 判断是否删除，值为true就删除
                die: false,
                // 圆弧圆心的x坐标
                posx: x,
                // 圆弧圆心的y坐标
                posy: y,
                // vx 表示 x轴的值 变化的速度
                vx: (Math.random() - 0.5) * 8,
                // vy 表示 y轴的值 变化的速度 取值范围：-3 到 -9
                vy: Math.random() * (-6) - 3,
                // 圆弧的半径
                radius: Math.random() * 1.5 + 1
            };
        }

        // 画一定数量的小水珠
        function madedrops(x, y) {
            // 随机生成一个数 maxi
            // maxi 代表要画小水珠的数量
            const maxi = Math.floor(Math.random() * 5 + 5);
            for (let i = 0; i < maxi; i++) {
                dropList.push(createDrop(x, y));
            }
        }

        // 开始调用update函数，更新动画
        window.requestAnimationFrame(update);

        // 更新动画
        function update() {
            // 如果保存小水珠的数组有内容
            if (dropList.length > 0) {
                // 遍历保存小水珠的数组
                dropList.forEach(function (e) {
                    //设置e.vx，vx表示x坐标变化的速度
                    // (speedX)/2 是为了，让小水珠 在x轴的移动距离短一点，看上去更真实点
                    // 也使 小水珠的移动方向 和 雨滴方向，雨滴下落方向，鼠标移动方向相同
                    e.vx = e.vx + (speedX / 2);
                    e.posx = e.posx + e.vx;

                    //设置e.vy，vy表示y坐标变化的速度
                    // e.vy的范围是-3 到 -9，而这时e.posy（y坐标）一定是正值，所以 e.posy的值会先减小后增大
                    // 也就是实现 雨滴散成小水珠，小水珠会先上升后下降的效果
                    e.vy = e.vy + Math.random() / 2;
                    e.posy = e.posy + e.vy;

                    // 如果 小水珠y坐标 大于 可视区域的高度，设置die属性为true
                    // 小水珠如果超出可视区域就删除掉
                    if (e.posy > canvasEl.clientHeight) {
                        e.die = true;
                    }
                });
            }

            // 删除 die属性为ture 的数组成员
            // 可视区域外的小水珠删除掉
            for (let i = dropList.length - 1; i >= 0; i--) {
                if (dropList[i].die) {
                    dropList.splice(i, 1);
                }
            }

            // 设置下雨方向变换的速度，取值范围： -1 到 1
            // 当 speedX = maxspeedx时，下雨方向 会 随鼠标移动方向立即改变
            speedX = speedX + (maxSpeedX - speedX) / 50;

            // 根据lineNum的值，画一定数量雨滴
            for (let i = 0; i < lineNum; i++) {
                // 调用createLine 函数，参数是雨滴x坐标
                createLine(Math.random() * 2 * canvasEl.width - (0.5 * canvasEl.width));
            }

            // 设置结束线，也就是雨滴散开 形成许多小水珠的位置
            let endLine = canvasEl.clientHeight - Math.random() * canvasEl.clientHeight / 5;

            // 遍历保存雨滴的数组
            lineList.forEach(function (e) {

                // 利用勾股定理 确定一个范围，在这个范围内雨滴会散开形成小水珠
                // e.posx + speedX * e.h 是雨滴x坐标
                // e.posy + e.h 是雨滴y坐标
                let dis = Math.sqrt(((e.posx + speedX * e.h) - mousePos[0]) * ((e.posx + speedX * e.h) - mousePos[0]) + (e.posy + e.h - mousePos[1]) * (e.posy + e.h - mousePos[1]));

                // 如果在mouseDis区域内，就删除雨滴，画一些小水珠（圆弧）
                // 实现鼠标碰到雨滴，雨滴散成小水珠的效果
                if (dis < mouseDis) {
                    // 删除 雨滴
                    e.die = true;
                    // 画一些小水珠（圆弧）
                    madedrops(e.posx + speedX * e.h, e.posy + e.h);
                }

                // 如果雨滴超过 结束线，删除雨滴，画一些小水珠（圆弧）
                if ((e.posy + e.h) > endLine) {
                    e.die = true;
                    madedrops(e.posx + speedX * e.h, e.posy + e.h);
                }

                // 如果 雨滴 y坐标 大于 可视区域的高度，设置die属性为true
                // 如果 雨滴 超出可视区域就删除掉
                if (e.posy >= canvasEl.clientHeight) {
                    e.die = true;
                } else {
                    // 逐渐增加 雨滴 y坐标的值
                    e.posy = e.posy + e.speed;

                    // 变化雨滴 x坐标
                    // * speedX 用来控制雨滴 下落 方向
                    // 使 雨滴下落方向 和 鼠标移动方向相同
                    e.posx = e.posx + e.speed * speedX;
                }
            });

            // 删除 die属性为ture 的数组成员
            // 鼠标区域内的，超过结束线的，可视区域外的雨滴删除掉
            for (let i = lineList.length - 1; i >= 0; i--) {
                if (lineList[i].die) {
                    lineList.splice(i, 1);
                }
            }

            render();
            window.requestAnimationFrame(update);
        }

        function calculateRGBColor(color, baseColor) {
            return color + flag * Math.round(baseColor / 100)
        }

        function render() {
            if (Math.round(r) === -10 || Math.round(r) === 255) {
                flag = -flag
            }

            r = calculateRGBColor(r, baseR);
            g = calculateRGBColor(g, baseG);
            b = calculateRGBColor(b, baseB);
            ctx.fillStyle = getRgb(r, g, b);
            ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

            // 画雨滴效果
            ctx.lineWidth = Math.round(5 * Math.random());
            lineList.forEach(function (line) {
                ctx.strokeStyle = line.color;
                ctx.beginPath();
                ctx.moveTo(line.posx, line.posy);

                // * speedX 用来控制雨滴方向
                // 使 雨滴方向 和 鼠标移动方向相同
                ctx.lineTo(line.posx + line.h * speedX, line.posy + line.h);
                ctx.stroke();
            });

            // 画雨滴散开形成小水珠效果
            ctx.lineWidth = 1;
            ctx.strokeStyle = getRgb(255 - r, 255 - g, 255 - b);
            dropList.forEach(function (e) {
                ctx.beginPath();
                ctx.arc(e.posx, e.posy, e.radius, Math.random() * Math.PI * 2, Math.PI);
                ctx.stroke();
            });
        }
    }

    render() {
        return (<canvas ref={this.canvas}/>)
    }
}

export default Canvas