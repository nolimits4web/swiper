import fs from 'fs';
import path from 'path';
import https from 'https';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const getSponsors = () => {
  return new Promise((resolve, reject) => {
    https
      .get('https://swiperjs.com/sponsors-list.json', (resp) => {
        let data = '';
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          resolve(JSON.parse(data));
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
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
    const perRow = 12;
    let rowIndex = 0;
    tableSponsors.forEach((item, index) => {
      const colIndex = index - perRow * rowIndex;
      if (colIndex > perRow - 1) rowIndex += 1;
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
const buildSponsorsList = async (sponsors) => {
  const silverSponsorsContent = sponsors['Silver Sponsor'].map((item) =>
    `
  - [${item.title}](${item.link})
  `.trim(),
  );
  const sponsorsContent = sponsors.Sponsor.map((item) =>
    `
  - [${item.title}](${item.link})
  `.trim(),
  );
  let backersContent = fs.readFileSync(path.resolve(__dirname, '../BACKERS.md'), 'utf-8');
  backersContent = backersContent.split('<!-- SILVER_SPONSOR -->');
  backersContent[1] = `\n${silverSponsorsContent.join('\n')}\n`;
  backersContent = backersContent.join('<!-- SILVER_SPONSOR -->');
  backersContent = backersContent.split('<!-- SPONSOR -->');
  backersContent[1] = `\n${sponsorsContent.join('\n')}\n`;
  backersContent = backersContent.join('<!-- SPONSOR -->');
  fs.writeFileSync(path.resolve(__dirname, '../BACKERS.md'), backersContent);
};
const buildSponsors = async () => {
  const entries = await getSponsors();
  const sponsors = {};
  if (entries) {
    const items = [...entries];
    items.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    items.forEach((item) => {
      if (!sponsors[item.plan]) sponsors[item.plan] = [];
      sponsors[item.plan].push(item);
    });
  }
  buildTables(sponsors);
  buildSponsorsList(sponsors);
};
buildSponsors();
