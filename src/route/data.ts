export const fetchForCategory = async () => {
  const res = await fetch(
    'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=categories&titles=water&formatversion=2&clshow=!hidden&cllimit=max',
  );
  const data = await res.json();
  const categories = data.query.pages[0].categories;
  const displayData = () => {
    categories.map((item: { title: string }) => {
      console.log(`title | ${item.title}`);
    });
  };

  displayData();
};

export const fetchForLink = async () => {
  // const resDataLink = await fetch(
  //   'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=links&titles=linux&formatversion=2',
  // );
  const getLinks = async (title: String) => {
    const responseForLinks = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=links&titles=${title}&formatversion=2`,
    );
    const dataLink = await responseForLinks.json();
    return dataLink.query.pages[0].links;
  };
  const links = await getLinks('Linux');
  const linksOfLinks = async () => {
    links.map(async (item: { title: string }) => {
      const everyLinksOfLinks = await getLinks(item.title);
      console.log(
        `\n ${item.title} has links: \n ${everyLinksOfLinks.map((item: any) => {
          return `\n ${item.title}`;
        })}`,
      );
    });
  };
  linksOfLinks();
};
