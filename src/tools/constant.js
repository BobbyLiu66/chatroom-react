export const weatherUrl = 'http://localhost:3002/weather?type=current';
export const imgUrl = 'https://storage.googleapis.com/chatroom.geekliubo.com/weather/';
export const weatherCode = {
    sunny: 800,
    rain: 5,
    clouds: 8,
    thunder: 2,
    snow: 6,
    mist: 7,
    drizzle: 3
};

export const weatherImg = {
    sunny: 'sky.jpeg',
    rain: 'rain.jpeg',
    clouds: 'clouds.jpeg',
    thunder: 'thunder.jpeg',
    snow: 'snow.jpeg',
    mist: 'mist.jpeg',
    drizzle: 'drizzle.jpeg'
};

export const avatarUrl = (username) => {
    return `https://chat-picture.s3.amazonaws.com/${username}.png`
};
