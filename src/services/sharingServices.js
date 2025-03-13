import { toPng, toBlob } from "html-to-image";
import download from "downloadjs";
import saveAs from "file-saver";
import * as htmlToImage from "html-to-image";
import html2canvas from "html2canvas-pro";
import { useEventStore } from "../store/event-store";

export async function shareSchedule() {
  const url = window.location;
  try {
    await navigator.share({
      title: " My Schedule",
      text: "Here's my lineup for the festival.",
      url,
    });
    console.log("Shared successfully");
  } catch (err) {
    console.error("error:", err.message);
  }
}

export async function createImage(item, callback) {
  await toPng(document.getElementById(item)).then(function (dataUrl) {
    callback(dataUrl);
  });
}

export async function createBlob(item, callback) {
  //  console.log(item);
  let node = document.getElementById("test");
  node.innerHTML = "";
  const parent = document.getElementById(item);

  node.appendChild(parent.firstChild);
  await toBlob(node);
  await toBlob(node);
  await toBlob(node);
  await toBlob(node).then(function (blob) {
    //  console.log({ blob });
    callback(blob);
  });
  //   node.innerHTML = "";
}

// export async function createPoster(posterID) {
//   const original = document.getElementById(posterID);
//   const node = original.cloneNode("deep");
//   node.id = posterID + "clone";
//   node.setAttribute("height", 700);
//   node.setAttribute("width", 400);
//   console.log(node);
//   await htmlToImage.toPng(node);
//   await htmlToImage.toPng(node);
//   htmlToImage.toPng(node).then((dataUrl) => {
//     console.log(dataUrl);
//     download(dataUrl, "Lineup.png");
//   });
// }

export async function createPoster5(posterID) {
  const parent = document.getElementById(posterID);

  let node = document.getElementById("test");
  node.appendChild(parent.firstChild.cloneNode(true));
  //   if (window.innerWidth < 768) {
  //     node = node.cloneNode(true);
  //   }
  //ode.appendChild(parent.firstChild.cloneNode(true));
  //      htmlToImage.toPng(node);
  //    htmlToImage.toPng(node);

  //   node.height = 500;
  //   node.width = 300;
  //   htmlToImage.toPng(node);
  //   htmlToImage.toPng(node);

  htmlToImage.toPng(node).then((dataUrl) => {
    htmlToImage.toPng(node).then((dataUrl2) => {
      download(dataUrl2, "Lineup.png");
    });
  });
  // .then(() => {
  //   document.getElementById("test").innerHTML = "";
  // });

  // });
  return "complete";
}

export async function downloadDesktop(item) {
  await createPoster5(item);
  //document.getElementById("test").innerHTML = "";
}
export async function createPosterMobile(posterID) {
  const parent = document.getElementById(posterID + "parent");
  //  console.log(parent);
  let node = document.getElementById("test");
  node.appendChild(parent.firstChild);
  console.log(node.ownerDocument.defaultView);
  await htmlToImage.toPng(node);
  await htmlToImage.toPng(node);
  const uri = await htmlToImage.toPng(node);
  // console.log(uri);
  //   const dataUrl = await htmlToImage.toPng(node);
  //   //await htmlToImage.toBlob(dataUrl);
  //   await htmlToImage.toBlob(uri);
  //   await htmlToImage.toBlob(uri);
  const blob = await (await fetch(uri)).blob();
  const file = new File([blob], "Lineup.png", { type: blob.type });
  navigator.share({
    title: "Blowout Lineup",
    test: "Checkout my lineup!",
    files: [file],
  });
}

export async function createPoster(posterID, containerClass = "") {
  //const container = document.querySelector("." + containerClass);
  const newNode = document.getElementById(posterID).cloneNode(true);
  //  console.log({ newNode });
  let node = document.getElementById("test");
  // console.log(parent.firstChild);
  if (!newNode) return;
  newNode.id = posterID + "new" + new Date().getMilliseconds();
  node.appendChild(newNode);
  await htmlToImage.toPng(node);
  await htmlToImage.toPng(node);
  let poster = await htmlToImage.toPng(node);
  //console.log(poster);
  //   const img = new Image();
  //   img.src = poster;
  //container.appendChild(img);

  // const uri = await htmlToImage.toPng(node);
  node.innerHTML = "";
  // console.log(img);
  return poster;
}

export async function setPosterForDownload(posterID, setter) {
  const imgFile = await createPoster(posterID);
  //  console.log(imgFile);
  setter(imgFile);
}

export async function createPosterImageArray(postersArr, containerClass, day, setter) {
  let i = 0;
  let tempArr = [];
  while (i < postersArr.length) {
    const posterID = "poster" + day.getDay() + postersArr[i].Title;
    const currentImg = await createPoster(posterID, containerClass);
    tempArr.push(currentImg);
    i++;
  }
  //console.log(tempArr);
  setter(tempArr);
}

export function createPoster2(posterId) {
  const elementToSave = document.getElementById(posterId);
  // console.log(elementToSave);
  html2canvas(elementToSave).then(function (canvas) {
    canvas.style = "width: 500px; height: 800px";
    canvas.width = 500;
    canvas.height = 800;

    //console.log(canvas);
    // console.log("I ran");
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/jpeg");
    a.download = "image.jpeg";
    a.click();
  });

  //   .then((canvas) => {
  //     console.log(canvas.toDataURL("image/jpeg"));
  //     const a = document.createElement("a");
  //     a.href = canvas.toDataURL("image/jpeg");
  //     a.download = "image.jpeg";
  //     a.click();
  // });
}

export function createAndDownloadImage(imageId) {
  //   const node = document.getElementById(imageId);
  //   console.log({ node });
  //   toPng(node).then((item) => toPng(node).then((dataUrl) => console.log(dataUrl, item)));
  //   //   await toPng(document.getElementById(imageId));
  //   await toPng(document.getElementById(imageId));
  //   console.log({ dataUrl });
  //   download(dataUrl, "Lineup.png");
  toBlob(document.getElementById(imageId)).then(function (blob) {
    //  console.log(blob);
  });
}

export function createPoster3(posterId) {
  const elementToSave = document.getElementById(posterId);
  elementToSave.setAttribute("height", 700);
  elementToSave.setAttribute("width", 400);
  //   elementToSave.widtth = 700;
  if (!elementToSave) {
    console.error(`Element with ID ${posterId} not found.`);
    return;
  }

  html2canvas(elementToSave)
    .then((canvas) => {
      canvas.setAttribute("height", 700);
      canvas.setAttribute("width", 400);
      const dataUrl = canvas.toDataURL("image/jpeg");
      download(dataUrl, "poster.jpeg", "image/jpeg");
    })
    .catch((error) => {
      console.error("html2canvas error:", error);
    });
}

export async function sharePoster(blob) {
  //const setPosterImg = useEventStore((state) => state.setPosterImg);
  //const filesArr = await convertToBlob(url);
  //console.log(blob);
  const filesArr = [new File([blob], "MyLineup.png", { type: blob.type })];
  try {
    await navigator.share({
      files: filesArr,
    });
    //  console.log("Shared successfully");
  } catch (err) {
    console.error("error:", err.message);
  }
  useEventStore.getState().setPosterImg(null);
}

export async function shareMobileImage(imageURL) {
  //await fetch(imageURL);
  fetch(imageURL)
    .then((res) => {
      return res.blob();
    })
    .then((blob) => {
      sharePoster(blob);
    });
  //   await res.blob();
  //   await res.blob();
  //   const blob = await res.blob();
  //   sharePoster(blob);
}

export async function shareMobile(item) {
  await createBlob(item, sharePoster);
  document.getElementById("test").innerHTML = "";
}

// async function convertToBlob(url) {
//   const blob = await (await fetch(url)).blob();
//   const filesArr = [new File([blob], "MyLineup.png", { type: "png" })];
//   return filesArr;
// }

export async function downloadPoster(url) {
  download(url, "Lineup.png");
}
