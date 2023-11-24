import { intern } from './card.js';

const internList = document.querySelector('.intern-grid');

intern.forEach((card) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const article = document.createElement("article");
    const imgWrap = document.createElement("div");
    const img = document.createElement("img");
    const desc = document.createElement("div");
    const tag = document.createElement("div");
    const dDay = document.createElement("span");
    const job = document.createElement("span");
    const title = document.createElement("h4");

    a.href = "#";
    img.src = card["img"];
    article.classList.add("hire");
    article.classList.add("box-shadow");
    imgWrap.classList.add("img-wrap");
    desc.classList.add("desc");
    tag.classList.add("tag");
    dDay.classList.add("d-day");
    job.classList.add("job");
    title.classList.add("ellipsis-line-2");

    imgWrap.append(img);
    dDay.append(card["dDay"]);
    job.append(card["job"]);
    title.append(card["title"]);

    tag.append(dDay, job, title);
    desc.append(tag);

    article.append(imgWrap, desc);
    a.append(article);
    li.append(a);
    internList.append(li);
});
