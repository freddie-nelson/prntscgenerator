const images = document.getElementById("images")
const corsLink = "https://prntscgenerator.herokuapp.com/?link=";
const count = 30

function generateAll() {
  for (let i = 0; i < count; i++) {
    generate();
  }
}

async function generate() {
  const code = getCode();
  const a = document.createElement("a");
  a.classList.add("image", "placeholder");
  images.appendChild(a);


  try {
    const [ image, link ] = await getImage(code);

    a.appendChild(image);
    a.setAttribute("href", link);
    a.setAttribute("target", "_blank")
    a.classList.remove("placeholder");
  } catch {
    images.removeChild(a);
    console.log("failed to get image")
  }
}

async function getImage(code) {
  const res = await fetch(`${corsLink}https://prnt.sc/${code}`);
  const html = await res.text();

  const regex = /<meta property="og:image" content="(.*)\.png"/
  const url = html.match(regex)[0].split("content=\"")[1].split("\"")[0];

  if (url.startsWith("//st")) return;

  const image = new Image(400, 400);
  const blob = await (await fetch(corsLink + url)).blob();

  const fr = new FileReader();

  return new Promise((resolve) => {
    fr.onloadend = f => {
      image.src = fr.result;
      resolve([ image, url ]);
    };

    fr.readAsDataURL(blob);
  })
}

function getCode() {
  const chars = randomChars();
  let nums = '';

  for (let i = 0; i < 4; i++) {
      nums += `${Math.floor(Math.random() * 10)}`;
  }

  return chars + nums;
}

function randomChars() {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let result = '';

    for (let i = 0; i < 2; i++) {
        result += chars[Math.floor(Math.random() * 26)]
    }

    return result
}