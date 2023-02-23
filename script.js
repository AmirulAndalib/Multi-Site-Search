function searchWebsites(query) {
  const results = document.getElementById('results');
  results.innerHTML = '';
  const websites = [
    {
      name: 'Comrademao',
      url: `https://comrademao.com/?s=${query}`,
      imageRegex: /<img src="([^"]+)"/,
      nameRegex: /<div class="bigor">\s+<div class="tt">\s+([^<]+)\s+<\/div>/,
      linkRegex: /<a href="([^"]+)"/,
    },
    {
      name: 'example.net',
      url: `https://www.example.net/search?q=${query}`,
      imageRegex: /<img src="([^"]+)" alt="[^"]*"/,
      nameRegex: /<h3><a href="[^"]+" class="tt">([^<]+)<\/a><\/h3>/,
      linkRegex: /<h3><a href="([^"]+)" class="result-title">[^<]+<\/a><\/h3>/,
    },
    {
      name: 'example.org',
      url: `https://www.example.org/search?q=${query}`,
      imageRegex: /<img src="([^"]+)" alt="[^"]*"/,
      nameRegex: /<h2 class="title"><a href="[^"]+" rel="bookmark">([^<]+)<\/a><\/h2>/,
      linkRegex: /<h2 class="title"><a href="([^"]+)" rel="bookmark">[^<]+<\/a><\/h2>/,
    },
  ];
  websites.forEach((website) => {
    fetch(website.url)
      .then((response) => response.text())
      .then((html) => {
        const imageMatch = html.match(website.imageRegex);
        const nameMatch = html.match(website.nameRegex);
        const linkMatch = html.match(website.linkRegex);
        if (imageMatch && nameMatch && linkMatch) {
          const result = {
            name: nameMatch[1],
            image: imageMatch[1],
            link: linkMatch[1],
          };
          displaySearchResult(result, website.name);
        }
      })
      .catch((error) => {
        console.error(`Error searching ${website.name}: ${error}`);
      });
  });
}

function displaySearchResult(result, websiteName) {
  const results = document.getElementById('results');
  let websiteList = results.querySelector(`#${websiteName}`);
  if (!websiteList) {
    websiteList = document.createElement('ul');
    websiteList.setAttribute('id', websiteName);
    results.appendChild(websiteList);
  }
  const item = document.createElement('li');
  const link = document.createElement('a');
  link.setAttribute('href', result.link);
  link.setAttribute('target', '_blank');
  const image = document.createElement('img');
  image.setAttribute('src', result.image);
  image.setAttribute('alt', result.name);
  const name = document.createElement('span');
  name.textContent = result.name;
  link.appendChild(image);
  link.appendChild(name);
  item.appendChild(link);
  websiteList.appendChild(item);
}
