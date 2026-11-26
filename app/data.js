// America by the Numbers — the dataset.
//
// Every figure is a rounded public statistic for the United States, labelled
// with its year and source on the site. Values are estimates compiled from
// the Census Bureau, Bureau of Economic Analysis, Bureau of Labor Statistics,
// CDC, Federal Reserve, Energy Information Administration and Department of
// Education releases for 2015-2024. State figures are 2024 estimates,
// rounded. See #/sources for the full methodology note.

export const META = {
  country: 'United States of America',
  shortName: 'United States',
  coverage: '2015-2024',
  updated: 'November 2026',
  indicators: 64,
  states: 51,
  topics: 8,
  sources: [
    'U.S. Census Bureau, Population Estimates Program',
    'Bureau of Economic Analysis, National Accounts',
    'Bureau of Labor Statistics, Current Population Survey',
    'Centers for Disease Control and Prevention, National Vital Statistics',
    'Federal Reserve, Financial Accounts of the United States',
    'U.S. Energy Information Administration, Annual Energy Outlook',
    'U.S. Department of Education, NCES Digest',
    'U.S. Department of Housing and Urban Development',
  ],
};

// Headline indicators shown on the home dashboard. change is the one-year
// move in percentage points (or percent for money values, marked with %).
export const HEADLINE = [
  { id: 'population', name: 'Population', value: 340.1, unit: 'million', format: 'm', change: +1.6, changeUnit: '%', year: 2024, source: 'Census Bureau', spark: [320.7, 323.0, 325.1, 327.2, 329.5, 331.5, 332.6, 333.3, 334.9, 340.1] },
  { id: 'gdp', name: 'GDP', value: 29.7, unit: 'trillion $', format: 'tn', change: +8.4, changeUnit: '%', year: 2024, source: 'BEA', spark: [18.2, 18.7, 19.5, 20.5, 21.4, 21.1, 23.3, 25.7, 27.4, 29.7] },
  { id: 'gdp-per-capita', name: 'GDP per person', value: 87400, unit: '$', format: 'usd', change: +6.7, changeUnit: '%', year: 2024, source: 'BEA', spark: [56800, 57900, 59900, 62600, 65000, 63700, 70100, 77000, 81800, 87400] },
  { id: 'unemployment', name: 'Unemployment', value: 4.0, unit: '%', format: 'pct', change: +0.4, changeUnit: 'pp', year: 2024, source: 'BLS', spark: [5.3, 4.9, 4.4, 3.9, 3.7, 8.1, 5.4, 3.6, 3.6, 4.0] },
  { id: 'income', name: 'Median household income', value: 81500, unit: '$', format: 'usd', change: +1.1, changeUnit: '%', year: 2024, source: 'Census Bureau', spark: [56500, 59000, 61400, 63200, 68700, 67500, 70800, 74600, 80600, 81500] },
  { id: 'life-expectancy', name: 'Life expectancy', value: 78.6, unit: 'years', format: 'num', change: +0.2, changeUnit: 'pp', year: 2024, source: 'CDC', spark: [78.9, 78.7, 78.6, 78.7, 78.8, 77.0, 76.4, 77.5, 78.4, 78.6] },
  { id: 'inflation', name: 'Inflation (CPI)', value: 2.9, unit: '%', format: 'pct', change: -1.2, changeUnit: 'pp', year: 2024, source: 'BLS', spark: [0.1, 1.3, 2.1, 2.4, 1.8, 1.2, 4.7, 8.0, 4.1, 2.9] },
  { id: 'debt', name: 'Federal debt', value: 36.2, unit: 'trillion $', format: 'tn', change: +9.4, changeUnit: '%', year: 2024, source: 'U.S. Treasury', spark: [18.1, 19.6, 20.2, 21.5, 22.7, 26.9, 28.4, 30.9, 33.1, 36.2] },
];

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Topics. Each indicator: id, name, unit, value (latest), year, source,
// format, series (2015-2024), note. Formats: num, pct, usd, tn, bn, m.
export const TOPICS = [
  {
    slug: 'people',
    name: 'People & Population',
    icon: '👥',
    color: '#2563eb',
    intro: '340 million people, growing slower than any decade since the 1930s — and older, more urban and more diverse than ever.',
    indicators: [
      { id: 'pop-total', name: 'Total population', unit: 'million', value: 340.1, year: 2024, source: 'Census Bureau', format: 'm', series: [320.7, 323.0, 325.1, 327.2, 329.5, 331.5, 332.6, 333.3, 334.9, 340.1], note: 'The 2024 jump reflects revised immigration estimates, not a sudden baby boom.' },
      { id: 'pop-growth', name: 'Annual population growth', unit: '%', value: 1.6, year: 2024, source: 'Census Bureau', format: 'pct', series: [0.7, 0.7, 0.7, 0.6, 0.7, 0.6, 0.4, 0.5, 0.5, 1.6], note: 'Growth was under 0.5% a year in 2021-2023, the slowest since the 1930s.' },
      { id: 'pop-median-age', name: 'Median age', unit: 'years', value: 39.2, year: 2024, source: 'Census Bureau', format: 'num', series: [37.8, 37.9, 38.0, 38.2, 38.4, 38.5, 38.8, 38.9, 39.1, 39.2], note: 'The median American is now over 39 — in 2000 it was 35.' },
      { id: 'pop-65plus', name: 'Share aged 65+', unit: '%', value: 17.9, year: 2024, source: 'Census Bureau', format: 'pct', series: [14.9, 15.2, 15.6, 16.0, 16.5, 16.9, 17.3, 17.7, 17.8, 17.9], note: 'One in six Americans is now past retirement age.' },
      { id: 'pop-urban', name: 'Share living in urban areas', unit: '%', value: 83.0, year: 2024, source: 'Census Bureau', format: 'pct', series: [80.7, 81.0, 81.3, 81.6, 82.0, 82.3, 82.5, 82.7, 82.9, 83.0], note: 'Five in six Americans live in a city or town of 2,500 or more.' },
      { id: 'pop-fertility', name: 'Fertility rate', unit: 'births per woman', value: 1.60, year: 2024, source: 'CDC', format: 'num', series: [1.84, 1.82, 1.77, 1.73, 1.71, 1.64, 1.66, 1.66, 1.62, 1.60], note: 'Below the 2.1 replacement level every year since 2007.' },
      { id: 'pop-foreign-born', name: 'Share born abroad', unit: '%', value: 14.3, year: 2024, source: 'Census Bureau', format: 'pct', series: [13.3, 13.4, 13.5, 13.6, 13.6, 13.7, 13.9, 14.1, 14.3, 14.3], note: 'One in seven residents was born in another country — the highest share since 1910.' },
      { id: 'pop-household-size', name: 'Average household size', unit: 'people', value: 2.53, year: 2024, source: 'Census Bureau', format: 'num', series: [2.54, 2.53, 2.52, 2.52, 2.51, 2.52, 2.52, 2.53, 2.53, 2.53], note: 'Households have shrunk from 3.1 people in 1970 to 2.5 today.' },
    ],
  },
  {
    slug: 'economy',
    name: 'Economy',
    icon: '📈',
    color: '#059669',
    intro: 'A $29.7 trillion economy — the largest on Earth — that doubled in nominal size in a decade, with services now four fifths of output.',
    indicators: [
      { id: 'gdp-nominal', name: 'GDP, nominal', unit: 'trillion $', value: 29.7, year: 2024, source: 'BEA', format: 'tn', series: [18.2, 18.7, 19.5, 20.5, 21.4, 21.1, 23.3, 25.7, 27.4, 29.7], note: 'The 2020 dip was the sharpest since 1946; the rebound was the fastest on record.' },
      { id: 'gdp-real-growth', name: 'Real GDP growth', unit: '%', value: 2.8, year: 2024, source: 'BEA', format: 'pct', series: [2.9, 1.8, 2.6, 3.0, 2.6, -2.2, 6.1, 2.5, 2.9, 2.8], note: 'Growth has run above 2.5% for three straight years.' },
      { id: 'gdp-services', name: 'Services share of GDP', unit: '%', value: 79.5, year: 2024, source: 'BEA', format: 'pct', series: [78.5, 78.7, 78.9, 79.0, 79.2, 79.5, 79.3, 79.4, 79.5, 79.5], note: 'Manufacturing is about 10% of output; agriculture under 1%.' },
      { id: 'trade-deficit', name: 'Goods trade deficit', unit: 'billion $', value: 1211, year: 2024, source: 'BEA', format: 'bn', series: [745, 749, 793, 874, 857, 901, 1083, 1183, 1063, 1211], note: 'The goods deficit hit a record in 2024; services run a large surplus.' },
      { id: 'cpi', name: 'Consumer price inflation', unit: '%', value: 2.9, year: 2024, source: 'BLS', format: 'pct', series: [0.1, 1.3, 2.1, 2.4, 1.8, 1.2, 4.7, 8.0, 4.1, 2.9], note: 'Inflation peaked at 9.1% in June 2022, the highest in 40 years.' },
      { id: 'productivity', name: 'Labour productivity growth', unit: '%', value: 2.2, year: 2024, source: 'BLS', format: 'pct', series: [1.1, 0.5, 1.2, 1.4, 1.8, 4.2, 2.5, 1.7, 2.0, 2.2], note: 'Productivity jumped in 2020 as low-wage jobs vanished first.' },
      { id: 'exports', name: 'Exports of goods and services', unit: 'trillion $', value: 3.1, year: 2024, source: 'BEA', format: 'tn', series: [2.3, 2.2, 2.4, 2.5, 2.5, 2.2, 2.6, 3.0, 3.0, 3.1], note: 'Exports are about 10% of GDP; services are the fastest-growing part.' },
      { id: 'small-biz', name: 'Small business share of jobs', unit: '%', value: 46.4, year: 2024, source: 'SBA', format: 'pct', series: [47.5, 47.4, 47.3, 47.2, 47.1, 46.8, 46.6, 46.5, 46.4, 46.4], note: 'Firms with under 500 workers employ nearly half of all Americans.' },
    ],
  },
  {
    slug: 'work',
    name: 'Work & Income',
    icon: '💼',
    color: '#d97706',
    intro: 'Unemployment is back near 4% after the pandemic spike, but the gains are uneven — and one in nine Americans still lives in poverty.',
    indicators: [
      { id: 'unemp', name: 'Unemployment rate', unit: '%', value: 4.0, year: 2024, source: 'BLS', format: 'pct', series: [5.3, 4.9, 4.4, 3.9, 3.7, 8.1, 5.4, 3.6, 3.6, 4.0], note: 'Unemployment hit 14.8% in April 2020, the highest since the 1930s.' },
      { id: 'lfp', name: 'Labour force participation', unit: '%', value: 62.5, year: 2024, source: 'BLS', format: 'pct', series: [62.7, 62.8, 62.9, 62.9, 63.1, 61.4, 61.7, 62.2, 62.5, 62.5], note: 'Participation never recovered its pre-pandemic level.' },
      { id: 'median-income', name: 'Median household income', unit: '$', value: 81500, year: 2024, source: 'Census Bureau', format: 'usd', series: [56500, 59000, 61400, 63200, 68700, 67500, 70800, 74600, 80600, 81500], note: 'Incomes jumped in 2023 as inflation eased and wages caught up.' },
      { id: 'wage-growth', name: 'Average hourly wage growth', unit: '%', value: 4.0, year: 2024, source: 'BLS', format: 'pct', series: [2.4, 2.9, 2.6, 3.0, 3.3, 4.5, 4.8, 5.2, 4.5, 4.0], note: 'Wages have outpaced inflation since mid-2023.' },
      { id: 'poverty', name: 'Poverty rate', unit: '%', value: 11.0, year: 2024, source: 'Census Bureau', format: 'pct', series: [13.5, 12.7, 12.3, 11.8, 10.5, 11.4, 7.8, 12.4, 11.1, 11.0], note: 'The 2021 drop to 7.8% was the expanded child tax credit at work.' },
      { id: 'gini', name: 'Gini index of inequality', unit: '0-1', value: 0.452, year: 2024, source: 'Census Bureau', format: 'num', series: [0.479, 0.481, 0.482, 0.485, 0.484, 0.489, 0.488, 0.480, 0.456, 0.452], note: 'Inequality eased after 2022 as lower incomes grew fastest.' },
      { id: 'union', name: 'Union membership', unit: '%', value: 9.9, year: 2024, source: 'BLS', format: 'pct', series: [11.1, 10.7, 10.7, 10.5, 10.3, 10.8, 10.3, 10.1, 10.0, 9.9], note: 'Union membership has fallen from 20% in 1983 to under 10% today.' },
      { id: 'remote-work', name: 'Workers working from home', unit: '%', value: 22.8, year: 2024, source: 'Census Bureau', format: 'pct', series: [5.7, 5.8, 5.9, 6.0, 6.1, 15.0, 17.9, 19.5, 21.0, 22.8], note: 'Remote work quadrupled in the pandemic; 2020 is an estimate, the survey was disrupted that year.' },
    ],
  },
  {
    slug: 'education',
    name: 'Education',
    icon: '🎓',
    color: '#7c3aed',
    intro: 'Nearly two in five adults now hold a bachelor’s degree — double the share of 1990 — while spending per pupil passed $17,000.',
    indicators: [
      { id: 'bachelors', name: 'Adults 25+ with a bachelor’s degree', unit: '%', value: 39.0, year: 2024, source: 'Census Bureau', format: 'pct', series: [32.5, 33.4, 34.2, 35.0, 36.0, 37.5, 37.9, 38.3, 38.7, 39.0], note: 'In 1990 the share was 21%; in 1970 it was 11%.' },
      { id: 'hs-grad', name: 'High school graduation rate', unit: '%', value: 87.5, year: 2024, source: 'NCES', format: 'pct', series: [83.2, 84.1, 84.6, 85.3, 85.8, 86.3, 86.9, 87.1, 87.4, 87.5], note: 'The graduation rate has risen every year for a decade.' },
      { id: 'spending-pupil', name: 'Public spending per pupil', unit: '$', value: 17400, year: 2024, source: 'NCES', format: 'usd', series: [12100, 12300, 12600, 13000, 13600, 14200, 15100, 16200, 16900, 17400], note: 'Pandemic relief funds pushed spending up sharply in 2021-2022.' },
      { id: 'college-enrol', name: 'College enrollment', unit: 'million', value: 18.5, year: 2024, source: 'NCES', format: 'm', series: [20.0, 19.8, 19.7, 19.6, 19.5, 18.0, 18.3, 18.2, 18.4, 18.5], note: 'Enrollment is still below its 2010 peak of 21 million.' },
      { id: 'reading-naep', name: '8th-grade reading proficiency', unit: '%', value: 30, year: 2024, source: 'NAEP', format: 'pct', series: [34, 33, 35, 33, 34, 31, 30, 29, 30, 30], note: 'Reading scores fell after the pandemic and have not recovered.' },
      { id: 'student-debt', name: 'Outstanding student debt', unit: 'trillion $', value: 1.77, year: 2024, source: 'Federal Reserve', format: 'tn', series: [1.22, 1.33, 1.40, 1.48, 1.56, 1.62, 1.68, 1.74, 1.76, 1.77], note: 'About 43 million borrowers owe an average of $41,000.' },
      { id: 'grad-degree', name: 'Adults 25+ with a graduate degree', unit: '%', value: 14.4, year: 2024, source: 'Census Bureau', format: 'pct', series: [11.4, 11.9, 12.3, 12.6, 13.1, 13.6, 13.8, 14.0, 14.2, 14.4], note: 'Master’s and doctoral degrees have grown twice as fast as bachelor’s.' },
      { id: 'teachers', name: 'Public school teachers', unit: 'million', value: 3.5, year: 2024, source: 'NCES', format: 'm', series: [3.2, 3.2, 3.2, 3.3, 3.3, 3.3, 3.4, 3.4, 3.5, 3.5], note: 'One teacher for every 15 pupils in public schools.' },
    ],
  },
  {
    slug: 'health',
    name: 'Health',
    icon: '🏥',
    color: '#dc2626',
    intro: 'Americans spend more on health than any nation — $14,600 per person — yet live shorter lives than peers in every other rich country.',
    indicators: [
      { id: 'life-exp', name: 'Life expectancy at birth', unit: 'years', value: 78.6, year: 2024, source: 'CDC', format: 'num', series: [78.9, 78.7, 78.6, 78.7, 78.8, 77.0, 76.4, 77.5, 78.4, 78.6], note: 'Covid cut 2.4 years off life expectancy; the rebound is nearly complete.' },
      { id: 'infant-mortality', name: 'Infant mortality', unit: 'per 1,000 births', value: 5.6, year: 2024, source: 'CDC', format: 'num', series: [5.9, 5.9, 5.8, 5.7, 5.6, 5.8, 5.9, 5.6, 5.6, 5.6], note: 'Twice the rate of most other wealthy countries.' },
      { id: 'health-spend', name: 'Health spending per person', unit: '$', value: 14600, year: 2024, source: 'CMS', format: 'usd', series: [9500, 9800, 10200, 10600, 11000, 11800, 12400, 13100, 13900, 14600], note: 'Health care is 17.6% of GDP — $4.9 trillion a year.' },
      { id: 'obesity', name: 'Adult obesity rate', unit: '%', value: 42.0, year: 2024, source: 'CDC', format: 'pct', series: [36.5, 37.7, 39.6, 39.6, 42.4, 42.4, 41.9, 41.9, 42.0, 42.0], note: 'Obesity has risen from 30% in 2000 to 42% today.' },
      { id: 'uninsured', name: 'Share without health insurance', unit: '%', value: 8.0, year: 2024, source: 'Census Bureau', format: 'pct', series: [9.1, 8.6, 7.9, 7.9, 8.0, 8.6, 8.3, 8.0, 7.9, 8.0], note: 'About 27 million people remain uninsured.' },
      { id: 'overdose', name: 'Drug overdose deaths', unit: 'thousand', value: 96, year: 2024, source: 'CDC', format: 'num', series: [52, 63, 70, 67, 71, 92, 107, 110, 112, 96], note: 'Deaths fell in 2024 for the first time in years, as naloxone spread.' },
      { id: 'smoking', name: 'Adult smoking rate', unit: '%', value: 11.6, year: 2024, source: 'CDC', format: 'pct', series: [15.1, 15.5, 14.0, 13.7, 14.0, 12.5, 11.5, 11.6, 11.6, 11.6], note: 'Smoking has fallen from 42% in 1965 to under 12% today.' },
      { id: 'diabetes', name: 'Adults with diagnosed diabetes', unit: '%', value: 11.6, year: 2024, source: 'CDC', format: 'pct', series: [9.4, 9.8, 10.0, 10.2, 10.5, 10.5, 10.8, 11.0, 11.3, 11.6], note: 'About 38 million Americans live with diabetes.' },
    ],
  },
  {
    slug: 'housing',
    name: 'Housing',
    icon: '🏠',
    color: '#0891b2',
    intro: 'Two in three households own their home, but the median house now costs $420,000 — and renters spend a third of their income on rent.',
    indicators: [
      { id: 'homeownership', name: 'Homeownership rate', unit: '%', value: 65.8, year: 2024, source: 'Census Bureau', format: 'pct', series: [63.7, 63.4, 63.9, 64.4, 64.6, 65.8, 65.5, 65.8, 65.9, 65.8], note: 'Ownership peaked at 69% in 2004, before the housing crash.' },
      { id: 'home-price', name: 'Median home sale price', unit: '$', value: 420000, year: 2024, source: 'NAR', format: 'usd', series: [294000, 307000, 323000, 326000, 329000, 347000, 391000, 442000, 431000, 420000], note: 'Prices are up 43% since 2019; mortgage rates near 7% keep buyers out.' },
      { id: 'median-rent', name: 'Median asking rent', unit: '$ / month', value: 1390, year: 2024, source: 'Census Bureau', format: 'usd', series: [1030, 1070, 1100, 1150, 1190, 1240, 1320, 1400, 1420, 1390], note: 'Rents rose 35% in five years, then levelled off in 2024.' },
      { id: 'housing-starts', name: 'Housing starts', unit: 'million', value: 1.36, year: 2024, source: 'Census Bureau', format: 'm', series: [1.11, 1.17, 1.20, 1.25, 1.29, 1.38, 1.60, 1.55, 1.41, 1.36], note: 'The U.S. is short an estimated 4 million homes.' },
      { id: 'rent-burden', name: 'Renters spending 30%+ of income', unit: '%', value: 49.8, year: 2024, source: 'Census Bureau', format: 'pct', series: [46.0, 46.8, 47.2, 47.6, 48.0, 48.8, 49.1, 49.6, 50.0, 49.8], note: 'Half of all renters are cost-burdened by the standard measure.' },
      { id: 'homeless', name: 'People experiencing homelessness', unit: 'thousand', value: 770, year: 2024, source: 'HUD', format: 'num', series: [565, 550, 554, 553, 568, 580, 580, 582, 653, 770], note: 'The 2024 count rose 18% in one year, the largest jump on record.' },
      { id: 'home-size', name: 'Median size of a new home', unit: 'sq ft', value: 2300, year: 2024, source: 'Census Bureau', format: 'num', series: [2400, 2420, 2450, 2470, 2490, 2470, 2430, 2400, 2350, 2300], note: 'New homes are shrinking for the first time in decades as builders chase affordability.' },
      { id: 'apartments', name: 'Apartments under construction', unit: 'million units', value: 1.0, year: 2024, source: 'Census Bureau', format: 'm', series: [0.9, 0.95, 1.0, 1.05, 1.05, 0.9, 1.0, 1.05, 1.1, 1.0], note: 'A record apartment boom is finally easing rent growth.' },
    ],
  },
  {
    slug: 'energy',
    name: 'Energy & Environment',
    icon: '🌿',
    color: '#16a34a',
    intro: 'Renewables now make nearly a quarter of America’s electricity, and one in ten new cars is electric — but per-person emissions are still among the world’s highest.',
    indicators: [
      { id: 'renewables', name: 'Renewables share of electricity', unit: '%', value: 22.8, year: 2024, source: 'EIA', format: 'pct', series: [13.7, 15.0, 17.5, 17.6, 18.3, 20.5, 20.3, 22.6, 21.4, 22.8], note: 'Wind and solar alone now beat coal, which has fallen below 16%.' },
      { id: 'co2', name: 'CO2 emissions', unit: 'billion tonnes', value: 4.9, year: 2024, source: 'EIA', format: 'bn', series: [5.5, 5.3, 5.3, 5.4, 5.2, 4.7, 5.0, 5.0, 4.9, 4.9], note: 'Emissions are 11% below 2015 despite a bigger economy.' },
      { id: 'co2-per-capita', name: 'CO2 per person', unit: 'tonnes', value: 14.3, year: 2024, source: 'EIA', format: 'num', series: [17.2, 16.4, 16.3, 16.5, 15.8, 14.2, 15.0, 15.0, 14.6, 14.3], note: 'Still roughly three times the world average.' },
      { id: 'ev-share', name: 'Electric share of new car sales', unit: '%', value: 10.2, year: 2024, source: 'EIA', format: 'pct', series: [0.9, 1.0, 1.2, 2.0, 2.0, 2.3, 4.4, 7.0, 9.3, 10.2], note: 'EVs passed one in ten new cars in 2024.' },
      { id: 'gas-price', name: 'Average gasoline price', unit: '$ / gallon', value: 3.40, year: 2024, source: 'EIA', format: 'usd', series: [2.43, 2.14, 2.42, 2.72, 2.60, 2.17, 3.01, 3.95, 3.52, 3.40], note: 'Gas peaked above $5 a gallon in June 2022.' },
      { id: 'energy-per-capita', name: 'Energy use per person', unit: 'million BTU', value: 285, year: 2024, source: 'EIA', format: 'num', series: [303, 300, 303, 308, 302, 282, 292, 294, 288, 285], note: 'Per-person energy use keeps falling as the economy gets more efficient.' },
      { id: 'solar-capacity', name: 'Installed solar capacity', unit: 'GW', value: 165, year: 2024, source: 'EIA', format: 'num', series: [25, 40, 50, 60, 75, 95, 120, 135, 145, 165], note: 'Solar capacity has grown more than sixfold in a decade.' },
      { id: 'coal-share', name: 'Coal share of electricity', unit: '%', value: 15.8, year: 2024, source: 'EIA', format: 'pct', series: [33.2, 30.4, 30.0, 27.5, 23.5, 19.3, 21.8, 19.5, 16.2, 15.8], note: 'Coal made a third of America’s electricity in 2015; now it makes a sixth.' },
    ],
  },
  {
    slug: 'government',
    name: 'Government & Debt',
    icon: '🏛️',
    color: '#475569',
    intro: 'The federal government owes $36 trillion — $106,000 per person — and spends more on interest than on defence.',
    indicators: [
      { id: 'fed-debt', name: 'Federal debt held by the public', unit: 'trillion $', value: 36.2, year: 2024, source: 'U.S. Treasury', format: 'tn', series: [18.1, 19.6, 20.2, 21.5, 22.7, 26.9, 28.4, 30.9, 33.1, 36.2], note: 'Debt has doubled since 2015 and now equals 121% of GDP.' },
      { id: 'deficit', name: 'Federal budget deficit', unit: 'trillion $', value: 1.83, year: 2024, source: 'CBO', format: 'tn', series: [0.44, 0.59, 0.67, 0.78, 0.98, 3.13, 2.78, 1.38, 1.70, 1.83], note: 'The deficit is 6.4% of GDP — high for an economy at full employment.' },
      { id: 'interest', name: 'Interest on the debt', unit: 'billion $', value: 882, year: 2024, source: 'U.S. Treasury', format: 'bn', series: [223, 241, 263, 325, 376, 345, 352, 475, 659, 882], note: 'Interest now costs more than defence ($874 billion).' },
      { id: 'fed-revenue', name: 'Federal revenue', unit: 'trillion $', value: 4.92, year: 2024, source: 'CBO', format: 'tn', series: [3.25, 3.27, 3.32, 3.33, 3.46, 3.42, 4.05, 4.90, 4.44, 4.92], note: 'Revenue is 16.7% of GDP, below the 50-year average of 17.3%.' },
      { id: 'fed-spending', name: 'Federal spending', unit: 'trillion $', value: 6.75, year: 2024, source: 'CBO', format: 'tn', series: [3.69, 3.85, 3.98, 4.11, 4.45, 6.55, 6.82, 6.27, 6.13, 6.75], note: 'Social Security is the biggest item at $1.5 trillion.' },
      { id: 'debt-per-person', name: 'Debt per person', unit: '$', value: 106500, year: 2024, source: 'U.S. Treasury', format: 'usd', series: [56500, 60700, 62100, 65700, 68900, 81100, 85400, 92700, 98900, 106500], note: 'Every American, newborns included, carries $106,500 of federal debt.' },
      { id: 'military', name: 'Military spending', unit: 'billion $', value: 874, year: 2024, source: 'CBO', format: 'bn', series: [633, 639, 646, 682, 724, 766, 801, 813, 820, 874], note: 'The U.S. spends more on defence than the next nine countries combined.' },
      { id: 'state-debt', name: 'State and local government debt', unit: 'trillion $', value: 3.1, year: 2024, source: 'Federal Reserve', format: 'tn', series: [2.9, 2.9, 3.0, 3.0, 3.1, 3.2, 3.1, 3.0, 3.1, 3.1], note: 'State and local debt is less than a tenth of the federal total.' },
    ],
  },
];

// States: 50 states + DC. pop = population in millions (2024 est),
// gdp = state GDP in $ billion (2024 est), income = median household
// income $ (2023), unemp = unemployment % (2024), life = life expectancy.
export const STATES = [
  { code: 'AL', name: 'Alabama', pop: 5.2, gdp: 310, income: 64000, unemp: 3.1, life: 75.2 },
  { code: 'AK', name: 'Alaska', pop: 0.7, gdp: 70, income: 86000, unemp: 4.7, life: 78.6 },
  { code: 'AZ', name: 'Arizona', pop: 7.6, gdp: 540, income: 74000, unemp: 3.8, life: 79.4 },
  { code: 'AR', name: 'Arkansas', pop: 3.1, gdp: 185, income: 60000, unemp: 4.0, life: 76.3 },
  { code: 'CA', name: 'California', pop: 39.4, gdp: 4245, income: 96500, unemp: 5.4, life: 81.2 },
  { code: 'CO', name: 'Colorado', pop: 5.9, gdp: 575, income: 95000, unemp: 4.2, life: 80.0 },
  { code: 'CT', name: 'Connecticut', pop: 3.7, gdp: 340, income: 96000, unemp: 3.5, life: 80.6 },
  { code: 'DE', name: 'Delaware', pop: 1.1, gdp: 105, income: 85000, unemp: 4.0, life: 78.3 },
  { code: 'DC', name: 'District of Columbia', pop: 0.7, gdp: 190, income: 108000, unemp: 5.7, life: 78.2 },
  { code: 'FL', name: 'Florida', pop: 23.4, gdp: 1703, income: 74000, unemp: 3.5, life: 80.0 },
  { code: 'GA', name: 'Georgia', pop: 11.2, gdp: 896, income: 76000, unemp: 3.6, life: 77.8 },
  { code: 'HI', name: 'Hawaii', pop: 1.4, gdp: 115, income: 90000, unemp: 2.9, life: 81.9 },
  { code: 'ID', name: 'Idaho', pop: 1.9, gdp: 125, income: 74000, unemp: 3.5, life: 79.0 },
  { code: 'IL', name: 'Illinois', pop: 12.7, gdp: 1156, income: 81700, unemp: 4.8, life: 79.0 },
  { code: 'IN', name: 'Indiana', pop: 6.9, gdp: 570, income: 70000, unemp: 3.9, life: 77.6 },
  { code: 'IA', name: 'Iowa', pop: 3.2, gdp: 250, income: 72000, unemp: 3.1, life: 79.2 },
  { code: 'KS', name: 'Kansas', pop: 2.9, gdp: 215, income: 72000, unemp: 3.6, life: 78.6 },
  { code: 'KY', name: 'Kentucky', pop: 4.5, gdp: 270, income: 63000, unemp: 4.8, life: 76.0 },
  { code: 'LA', name: 'Louisiana', pop: 4.6, gdp: 305, income: 58000, unemp: 3.7, life: 75.7 },
  { code: 'ME', name: 'Maine', pop: 1.4, gdp: 95, income: 73000, unemp: 3.3, life: 78.6 },
  { code: 'MD', name: 'Maryland', pop: 6.3, gdp: 583, income: 105000, unemp: 3.1, life: 79.2 },
  { code: 'MA', name: 'Massachusetts', pop: 7.1, gdp: 775, income: 99000, unemp: 3.6, life: 80.7 },
  { code: 'MI', name: 'Michigan', pop: 10.1, gdp: 670, income: 71000, unemp: 5.2, life: 78.0 },
  { code: 'MN', name: 'Minnesota', pop: 5.8, gdp: 500, income: 88000, unemp: 3.4, life: 80.6 },
  { code: 'MS', name: 'Mississippi', pop: 2.9, gdp: 145, income: 54000, unemp: 3.4, life: 74.9 },
  { code: 'MO', name: 'Missouri', pop: 6.2, gdp: 455, income: 68000, unemp: 3.6, life: 77.2 },
  { code: 'MT', name: 'Montana', pop: 1.1, gdp: 80, income: 70000, unemp: 3.2, life: 78.8 },
  { code: 'NE', name: 'Nebraska', pop: 2.0, gdp: 170, income: 74000, unemp: 2.9, life: 79.6 },
  { code: 'NV', name: 'Nevada', pop: 3.2, gdp: 270, income: 75000, unemp: 5.7, life: 78.5 },
  { code: 'NH', name: 'New Hampshire', pop: 1.4, gdp: 110, income: 103000, unemp: 2.8, life: 80.1 },
  { code: 'NJ', name: 'New Jersey', pop: 9.5, gdp: 857, income: 101000, unemp: 4.7, life: 80.4 },
  { code: 'NM', name: 'New Mexico', pop: 2.1, gdp: 130, income: 61000, unemp: 4.3, life: 77.3 },
  { code: 'NY', name: 'New York', pop: 19.9, gdp: 2203, income: 82100, unemp: 4.2, life: 81.1 },
  { code: 'NC', name: 'North Carolina', pop: 11.0, gdp: 795, income: 72000, unemp: 3.6, life: 78.4 },
  { code: 'ND', name: 'North Dakota', pop: 0.8, gdp: 85, income: 75000, unemp: 2.8, life: 79.5 },
  { code: 'OH', name: 'Ohio', pop: 11.9, gdp: 872, income: 70000, unemp: 4.2, life: 77.6 },
  { code: 'OK', name: 'Oklahoma', pop: 4.1, gdp: 255, income: 64000, unemp: 3.4, life: 75.9 },
  { code: 'OR', name: 'Oregon', pop: 4.3, gdp: 350, income: 81000, unemp: 4.4, life: 79.6 },
  { code: 'PA', name: 'Pennsylvania', pop: 13.1, gdp: 970, income: 76000, unemp: 3.6, life: 78.7 },
  { code: 'RI', name: 'Rhode Island', pop: 1.1, gdp: 80, income: 81000, unemp: 4.5, life: 79.6 },
  { code: 'SC', name: 'South Carolina', pop: 5.4, gdp: 330, income: 68000, unemp: 3.9, life: 77.2 },
  { code: 'SD', name: 'South Dakota', pop: 0.9, gdp: 80, income: 72000, unemp: 2.8, life: 79.4 },
  { code: 'TN', name: 'Tennessee', pop: 7.1, gdp: 560, income: 68000, unemp: 3.5, life: 76.0 },
  { code: 'TX', name: 'Texas', pop: 31.3, gdp: 2691, income: 80000, unemp: 4.2, life: 78.9 },
  { code: 'UT', name: 'Utah', pop: 3.5, gdp: 290, income: 95000, unemp: 3.0, life: 79.8 },
  { code: 'VT', name: 'Vermont', pop: 0.65, gdp: 55, income: 81000, unemp: 2.6, life: 80.3 },
  { code: 'VA', name: 'Virginia', pop: 8.8, gdp: 735, income: 96000, unemp: 3.0, life: 79.4 },
  { code: 'WA', name: 'Washington', pop: 7.9, gdp: 854, income: 99000, unemp: 4.2, life: 80.3 },
  { code: 'WV', name: 'West Virginia', pop: 1.8, gdp: 105, income: 59000, unemp: 4.0, life: 75.4 },
  { code: 'WI', name: 'Wisconsin', pop: 5.9, gdp: 459, income: 76000, unemp: 3.1, life: 79.2 },
  { code: 'WY', name: 'Wyoming', pop: 0.58, gdp: 55, income: 75000, unemp: 3.2, life: 79.0 },
];

// National averages used on state detail pages.
export const NATIONAL = {
  pop: 340.1,
  gdp: 29700,
  income: 81500,
  unemp: 4.0,
  life: 78.6,
};

// Population by age group, 2024 (share of total, %).
export const AGE_GROUPS = [
  { label: '0-17', value: 21.8 },
  { label: '18-24', value: 9.2 },
  { label: '25-44', value: 26.4 },
  { label: '45-64', value: 24.7 },
  { label: '65+', value: 17.9 },
];

// GDP by sector, 2024 (share of GDP, %).
export const SECTORS = [
  { label: 'Services', value: 79.5 },
  { label: 'Industry', value: 18.4 },
  { label: 'Manufacturing', value: 10.1 },
  { label: 'Agriculture', value: 0.9 },
];

// Electricity generation mix, 2024 (share, %).
export const ENERGY_MIX = [
  { label: 'Natural gas', value: 43.0 },
  { label: 'Coal', value: 15.8 },
  { label: 'Nuclear', value: 18.5 },
  { label: 'Wind', value: 10.4 },
  { label: 'Hydro', value: 5.7 },
  { label: 'Solar', value: 6.0 },
  { label: 'Other', value: 0.6 },
];

// Federal spending breakdown, 2024 ($ billion).
export const SPENDING = [
  { label: 'Social Security', value: 1518 },
  { label: 'Health (Medicare/Medicaid)', value: 1640 },
  { label: 'National defence', value: 874 },
  { label: 'Net interest', value: 882 },
  { label: 'Income security', value: 523 },
  { label: 'Veterans', value: 348 },
  { label: 'Education & training', value: 251 },
  { label: 'Transport', value: 141 },
  { label: 'Other', value: 573 },
];

export function findTopic(slug) {
  return TOPICS.find((t) => t.slug === slug);
}

export function findState(code) {
  return STATES.find((s) => s.code === code.toUpperCase());
}

export function allIndicators() {
  const out = [];
  for (const t of TOPICS) {
    for (const ind of t.indicators) out.push({ ...ind, topic: t.name, topicSlug: t.slug });
  }
  return out;
}

export function searchAll(q) {
  const needle = q.trim().toLowerCase();
  if (!needle) return { topics: [], indicators: [], states: [] };
  return {
    topics: TOPICS.filter((t) => t.name.toLowerCase().includes(needle)),
    indicators: allIndicators().filter(
      (i) => i.name.toLowerCase().includes(needle) || i.note.toLowerCase().includes(needle),
    ),
    states: STATES.filter((s) => s.name.toLowerCase().includes(needle) || s.code.toLowerCase() === needle),
  };
}
