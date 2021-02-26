const fs = require('fs');
const path = require('path');

const getSponsor = (item) => {
  const { createdAt } = item.sys;
  const { title, link, plan, ref, image, imageHorizontal } = item.fields;

  const sponsor = {
    createdAt,
    title,
    link,
    plan,
    ref,
    image: image ? image.fields.file.fileName : '',
    image_h: imageHorizontal ? image.fields.file.fileName : '',
  };

  return sponsor;
};

const buildTables = (sponsors) => {
  const tableSponsors = [
    ...(sponsors['Platinum Sponsor'] || []),
    ...(sponsors['Gold Sponsor'] || []),
    ...(sponsors['Silver Sponsor'] || []),
    ...(sponsors['Sponsor'] || []), // eslint-disable-line
  ];

  let tableContent = '';
  if (tableSponsors.length > 0) {
    const rows = [];
    const perRow = 5;
    let rowIndex = 0;

    tableSponsors.forEach((item, index) => {
      const colIndex = index - perRow * rowIndex;
      if (colIndex > 4) rowIndex += 1;
      if (!rows[rowIndex]) rows[rowIndex] = [];
      rows[rowIndex].push(item);
    });
    if (rows.length > 0 && rows[rows.length - 1].length < perRow) {
      rows[rows.length - 1].push(...Array.from({ length: perRow - rows[rows.length - 1].length }));
    }
    tableContent = `\n<table>\n${rows
      .map((items) =>
        [
          `  <tr>`,
          items
            .map((item) =>
              !item
                ? '    <td align="center" valign="middle"></td>'
                : [
                    `    <td align="center" valign="middle">`,
                    `      <a href="${item.link}" target="_blank">`,
                    `        <img src="https://swiperjs.com/images/sponsors/${item.image}" alt="${item.title}" width="160">`,
                    `      </a>`,
                    `    </td>`,
                  ].join('\n'),
            )
            .join('\n'),
          `  </tr>`,
        ].join('\n'),
      )
      .join('\n')}\n</table>\n`;
  }

  const backersContent = fs
    .readFileSync(path.resolve(__dirname, '../BACKERS.md'), 'utf-8')
    .split('<!-- SPONSORS_TABLE_WRAP -->');
  backersContent[1] = tableContent;

  const readmeContent = fs
    .readFileSync(path.resolve(__dirname, '../README.md'), 'utf-8')
    .split('<!-- SPONSORS_TABLE_WRAP -->');
  readmeContent[1] = tableContent;

  fs.writeFileSync(
    path.resolve(__dirname, '../BACKERS.md'),
    backersContent.join('<!-- SPONSORS_TABLE_WRAP -->'),
  );

  fs.writeFileSync(
    path.resolve(__dirname, '../README.md'),
    readmeContent.join('<!-- SPONSORS_TABLE_WRAP -->'),
  );
};

const buildSponsors = async () => {
  let spaceId;
  let accessToken;

  try {
    fs.readFileSync(path.resolve(__dirname, '../.env.local'), 'utf-8')
      .trim()
      .split('\n')
      .forEach((line) => {
        const [key, value] = line.split('=');
        if (key === 'CONTENTFUL_SPACE_ID') spaceId = value;
        if (key === 'CONTENTFUL_ACCESS_TOKEN') accessToken = value;
      });
  } catch (err) {
    spaceId = process.env.CONTENTFUL_SPACE_ID;
    accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  }

  if (!spaceId || !accessToken) {
    return;
  }

  // eslint-disable-next-line
  const client = require('contentful').createClient({
    space: spaceId,
    accessToken,
  });

  const entries = await client.getEntries();

  const sponsors = {};
  if (entries.items) {
    const items = entries.items.map((item) => getSponsor(item));
    items.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });

    items.forEach((item) => {
      if (!sponsors[item.plan]) sponsors[item.plan] = [];
      sponsors[item.plan].push(item);
    });
  }

  buildTables(sponsors);
};

buildSponsors();
