import React, { useState, useEffect } from 'react';
import ResultCards from './ResultCards';
import ResultPagination from './ResultPagination';
import './SearchResults.css';

const SearchResults = ({ selectedType, selectedSubTypes, abvRange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayType, setDisplayType] = useState(selectedType);
  
  useEffect(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setDisplayType(selectedType);
      setIsTransitioning(false);
    }, 300);
  }, [selectedType, selectedSubTypes, abvRange]);

  const filterResults = (items) => {
    return items.filter(item => {
      const abvValue = parseFloat(item.abv);
      const meetsAbvRange = abvValue >= abvRange[0] && abvValue <= abvRange[1];
      const meetsTypeFilter = selectedSubTypes.length === 0 || selectedSubTypes.includes(item.type);
      
      return meetsAbvRange && meetsTypeFilter;
    });
  };

  const itemsPerPage = 15;

  const dummyResults = {
    Beer: [
        {
            "name": "All Day IPA",
            "type": "IPA",
            "distributor": "Founders Brewing Co.",
            "abv": "4.7%",
            "url": "https://foundersbrewing.com/our-beer/all-day-ipa/"
        },
        {
            "name": "Wequetong Cherry Wheat",
            "type": "Wheat Beer",
            "distributor": "Keweenaw Brewing Company",
            "abv": "4.8%",
            "url": "https://kbc.beer/our-beers"
        },
        {
            "name": "Longsnapper IPA",
            "type": "IPA",
            "distributor": "Longsnapper IPA",
            "abv": "6.0%",
            "url": "https://longsnapperipa.com/"
        },
        {
            "name": "ERDINGER Weissbier",
            "type": "Wheat Beer",
            "distributor": "U.S. Beverage",
            "abv": "5.3%",
            "url": "https://int.erdinger.de/beer/weissbier.html"
        },
        {
            "name": "M-43",
            "type": "IPA",
            "distributor": "Old Nation Brewing Co.",
            "abv": "6.8%",
            "url": "https://oldnationbrewing.com/m-43/"
        },
        {
            "name": "Mango Cart",
            "type": "Wheat Beer",
            "distributor": "Golden Road Brewing",
            "abv": "4.0%",
            "url": "https://www.goldenroad.la/mango-cart"
        },
        {
            "name": "Space Dust IPA",
            "type": "IPA",
            "distributor": "Elysian Brewing",
            "abv": "8.2%",
            "url": "https://www.elysianbrewing.com/beer/space-dust-ipa/"
        },
        {
            "name": "Gumballhead",
            "type": "Wheat Beer",
            "distributor": "3 Floyds Brewing Co.",
            "abv": "5.6%",
            "url": "https://www.3floyds.com/beer/gumballhead/"
        },
        {
            "name": "Stone IPA",
            "type": "IPA",
            "distributor": "Stone Brewing",
            "abv": "6.9%",
            "url": "https://www.stonebrewing.com/beer/year-round-releases/stone-ipa"
        },
        {
            "name": "Wow Wheat",
            "type": "Wheat Beer",
            "distributor": "Four Peaks Brewing Company",
            "abv": "5.0%",
            "url": "https://www.fourpeaks.com/wow-wheat"
        },
        {
            "name": "Truth",
            "type": "IPA",
            "distributor": "Rhinegeist Brewery",
            "abv": "7.2%",
            "url": "https://rhinegeist.com/beer/truth/"
        },
        {
            "name": "DreamWeaver Wheat",
            "type": "Wheat Beer",
            "distributor": "Tröegs Independent Brewing",
            "abv": "4.8%",
            "url": "https://troegs.com/beer/dreamweaver/"
        },
        {
            "name": "Royal Pride IPA",
            "type": "IPA",
            "distributor": "Royal Oak Brewery",
            "abv": "6.5%",
            "url": "https://www.beeradvocate.com/beer/profile/2351/42374/"
        },
        {
            "name": "Allagash White",
            "type": "Wheat Beer",
            "distributor": "Allagash Brewing Company",
            "abv": "5.2%",
            "url": "https://www.allagash.com/beer/white/"
        },
        {
            "name": "120 Minute IPA",
            "type": "IPA",
            "distributor": "Dogfish Head Brewing",
            "abv": "15-20%",
            "url": "https://www.dogfish.com/brewery/beer/120-minute-ipa"
        },
        {
            "name": "Blue Star Wheat Beer",
            "type": "Wheat Beer",
            "distributor": "North Coast Brewing Co.",
            "abv": "4.5%",
            "url": "https://northcoastbrewing.com/beer/blue-star-wheat/"
        },
        {
            "name": "Lagunitas IPA",
            "type": "IPA",
            "distributor": "Lagunitas Brewing Company",
            "abv": "6.2%",
            "url": "https://lagunitas.com/beer/ipa/"
        },
        {
            "name": "Tangerine Wheat",
            "type": "Wheat Beer",
            "distributor": "Lost Coast Brewery",
            "abv": "5.2%",
            "url": "https://lostcoast.com/beer/tangerine-wheat/"
        },
        {
            "name": "Stoneface IPA",
            "type": "IPA",
            "distributor": "Stoneface Brewing Co.",
            "abv": "7.2%",
            "url": "https://www.stonefacebrewing.com/ipa"
        },
        {
            "name": "Canebrake",
            "type": "Wheat Beer",
            "distributor": "Parish Brewing Co.",
            "abv": "5.0%",
            "url": "https://parishbeer.com/beer/canebrake/"
        },
        {
            "name": "Two Hearted IPA",
            "type": "IPA",
            "distributor": "Bell's Brewery",
            "abv": "7.0%",
            "url": "https://bellsbeer.com/beer/two-hearted-ale/"
        },
        {
            "name": "AlphaGator",
            "type": "IPA",
            "distributor": "Abita Beer",
            "abv": "8.5%",
            "url": "https://abita.com/brews/alphagator"
        },
        {
            "name": "Peach Wheat",
            "type": "Wheat Beer",
            "distributor": "Meadowlark Brewing",
            "abv": "4.5%",
            "url": "https://www.meadowlarkbrewing.com/peach-wheat"
        },
        {
            "name": "Greene King IPA",
            "type": "IPA",
            "distributor": "Greene King",
            "abv": "3.6%",
            "url": "https://www.greeneking.co.uk/our-beers/greene-king-ipa/"
        },
        {
            "name": "Oberon Ale",
            "type": "Wheat Beer",
            "distributor": "Bell's Brewery",
            "abv": "5.8%",
            "url": "https://bellsbeer.com/beer/oberon-ale/"
        },
        {
            "name": "Fat Tire",
            "type": "Amber Ale",
            "distributor": "New Belgium Brewing",
            "abv": "5.2%",
            "url": "https://www.newbelgium.com/beer/fat-tire/"
        },
        {
            "name": "Hopslam Ale",
            "type": "Double IPA",
            "distributor": "Bell's Brewery",
            "abv": "10.0%",
            "url": "https://bellsbeer.com/beer/hopslam-ale/"
        },
        {
            "name": "Pacifico Clara",
            "type": "Lager",
            "distributor": "Grupo Modelo",
            "abv": "4.4%",
            "url": "https://www.pacificobeer.com/"
        },
        {
            "name": "Samuel Adams Boston Lager",
            "type": "Lager",
            "distributor": "Boston Beer Company",
            "abv": "5.0%",
            "url": "https://www.samueladams.com/our-beers/originals/boston-lager"
        },
        {
            "name": "Guinness Draught",
            "type": "Stout",
            "distributor": "Guinness",
            "abv": "4.2%",
            "url": "https://www.guinness.com/en-us/our-beers/guinness-draught/"
        },
        {
            "name": "Heineken",
            "type": "Lager",
            "distributor": "Heineken",
            "abv": "5.0%",
            "url": "https://www.heineken.com/"
        },
        {
            "name": "Blue Moon Belgian White",
            "type": "Wheat Beer",
            "distributor": "Blue Moon Brewing Company",
            "abv": "5.4%",
            "url": "https://www.bluemoonbrewingcompany.com/beers"
        },
        {
            "name": "Budweiser",
            "type": "Lager",
            "distributor": "Anheuser-Busch",
            "abv": "5.0%",
            "url": "https://www.budweiser.com/"
        },
        {
            "name": "Modelo Especial",
            "type": "Lager",
            "distributor": "Grupo Modelo",
            "abv": "4.4%",
            "url": "https://www.modelousa.com/Especial"
        },
        {
            "name": "Lagunitas Little Sumpin’ Sumpin’ Ale",
            "type": "Wheat Beer",
            "distributor": "Lagunitas Brewing Company",
            "abv": "7.5%",
            "url": "https://lagunitas.com/beer/little-sumpin/"
        },
        {
            "name": "Coors Light",
            "type": "Lager",
            "distributor": "Coors Brewing Company",
            "abv": "4.2%",
            "url": "https://www.coorslight.com/"
        },
        {
            "name": "Michelob Ultra",
            "type": "Lager",
            "distributor": "Anheuser-Busch",
            "abv": "4.2%",
            "url": "https://www.michelobultra.com/"
        },
        {
            "name": "Corona Extra",
            "type": "Lager",
            "distributor": "Grupo Modelo",
            "abv": "4.6%",
            "url": "https://www.corona.com/en/"
        },
        {
            "name": "Sierra Nevada Pale Ale",
            "type": "Pale Ale",
            "distributor": "Sierra Nevada Brewing Co.",
            "abv": "5.6%",
            "url": "https://sierranevada.com/beer/pale-ale/"
        },
        {
            "name": "Newcastle Brown Ale",
            "type": "Brown Ale",
            "distributor": "Heineken",
            "abv": "4.7%",
            "url": "https://www.newcastlebrownale.co.uk/"
        },
        {
            "name": "Dos Equis Lager Especial",
            "type": "Lager",
            "distributor": "Cuauhtémoc Moctezuma Brewery",
            "abv": "4.2%",
            "url": "https://www.dosequis.com/"
        },
        {
            "name": "Pabst Blue Ribbon",
            "type": "Lager",
            "distributor": "Pabst Brewing Company",
            "abv": "4.8%",
            "url": "https://pabstblueribbon.com/"
        },
        {
            "name": "Yuengling Traditional Lager",
            "type": "Lager",
            "distributor": "D.G. Yuengling & Son",
            "abv": "4.5%",
            "url": "https://www.yuengling.com/beers/traditional-lager/"
        },
        {
            "name": "Goose Island IPA",
            "type": "IPA",
            "distributor": "Goose Island Beer Co.",
            "abv": "5.9%",
            "url": "https://www.gooseisland.com/beers/ipa"
        },
        {
            "name": "Hvalur",
            "type": "Whale Testicle Beer",
            "distributor": "Stedji Brewery",
            "abv": "5.2%",
            "url": "https://thebeerexchange.io/weird-flavored-beers/"
        },
        {
            "name": "Pliny the Younger",
            "type": "Triple IPA",
            "distributor": "Russian River Brewing Company",
            "abv": "10.25%",
            "url": "https://www.tastingtable.com/1218125/rare-beers-that-are-worth-tracking-down/"
        },
        {
            "name": "Jester King Snörkel",
            "type": "Farmhouse Ale",
            "distributor": "Jester King Brewery",
            "abv": "4.3%",
            "url": "https://uproxx.com/life/the-most-unique-beers-ever-according-to-experts/"
        },
        {
            "name": "Dogfish Head 90 Minute IPA",
            "type": "Imperial IPA",
            "distributor": "Dogfish Head Brewery",
            "abv": "9.0%",
            "url": "https://www.foodandwine.com/beer/craft-beer/25-most-important-american-craft-beers-ever-brewed"
        },
        {
            "name": "Siren Craft Brew's Caribbean Chocolate Cake",
            "type": "Stout",
            "distributor": "Siren Craft Brew",
            "abv": "7.4%",
            "url": "https://www.thesun.co.uk/shopping/31513438/gifts-for-beer-lovers/"
        },
        {
            "name": "Prime Time",
            "type": "Low-Calorie IPA",
            "distributor": "Prime Time",
            "abv": "4.0%",
            "url": "https://www.thetimes.co.uk/article/we-thought-why-has-no-one-ever-put-caffeine-in-a-beer-before-enterprise-network-tbnj32pfh"
        },
        {
            "name": "Daydreamer",
            "type": "Lager",
            "distributor": "Changing Times Brewery",
            "abv": "4.2%",
            "url": "https://www.thesun.ie/money/14177098/changing-times-brewery-new-beers-dublin-pubs/"
        },
        {
            "name": "After Hours",
            "type": "Hazy Pale Ale",
            "distributor": "Changing Times Brewery",
            "abv": "5.0%",
            "url": "https://www.thesun.ie/money/14177098/changing-times-brewery-new-beers-dublin-pubs/"
        },
        {
            "name": "Frozen Neck IPA",
            "type": "IPA",
            "distributor": "Beavertown Brewery",
            "abv": "6.0%",
            "url": "https://www.thesun.co.uk/shopping/31513438/gifts-for-beer-lovers/"
        },
        {
            "name": "Raspberry Sour",
            "type": "Sour Ale",
            "distributor": "Avery Brewing Company",
            "abv": "6.5%",
            "url": "https://en.wikipedia.org/wiki/Avery_Brewing_Company"
        },
        {
            "name": "Vanilla Bean Stout",
            "type": "Stout",
            "distributor": "Avery Brewing Company",
            "abv": "8.5%",
            "url": "https://en.wikipedia.org/wiki/Avery_Brewing_Company"
        },
        {
            "name": "Hog Heaven",
            "type": "Imperial Red IPA",
            "distributor": "Avery Brewing Company",
            "abv": "9.2%",
            "url": "https://en.wikipedia.org/wiki/Avery_Brewing_Company"
        },
        {
            "name": "The Reverend",
            "type": "Belgian-Style Quadrupel Ale",
            "distributor": "Avery Brewing Company",
            "abv": "10.0%",
            "url": "https://en.wikipedia.org/wiki/Avery_Brewing_Company"
        },
        {
            "name": "Salvation",
            "type": "Belgian-Style Golden Ale",
            "distributor": "Avery Brewing Company",
            "abv": "9.0%",
            "url": "https://en.wikipedia.org/wiki/Avery_Brewing_Company"
        },
        {
            "name": "Uncle Jacob's Stout",
            "type": "Stout",
            "distributor": "Avery Brewing Company",
            "abv": "15.0%",
            "url": "https://en.wikipedia.org/wiki/Avery_Brewing_Company"
        },
        {
            "name": "Rumpkin",
            "type": "Pumpkin Ale",
            "distributor": "Avery Brewing Company",
            "abv": "15.0%",
            "url": "https://en.wikipedia.org/wiki/Avery_Brewing_Company"
        },
        {
            "name": "Tweak",
            "type": "Coffee Stout",
            "distributor": "Avery Brewing Company",
            "abv": "17.5%",
            "url": "https://en.wikipedia.org/wiki/Avery_Brewing_Company"
        },
        {
            "name": "Pump[KY]n",
            "type": "Pumpkin Porter",
            "distributor": "Avery Brewing Company",
            "abv": "15.0%",
            "url": "https://en.wikipedia.org/wiki/Avery_Brewing_Company"
        },
        {
            "name": "Samael's",
            "type": "Oak Aged Ale",
            "distributor": "Avery Brewing Company",
            "abv": "15.0%",
            "url": "https://en.wikipedia.org/wiki/Avery_Brewing_Company"
        },
        {
            "name": "The Beast",
            "type": "Grand Cru",
            "distributor": "Avery Brewing Company",
            "abv": "16.0%",
            "url": "https://en.wikipedia.org/wiki/Avery_Brewing_Company"
        },
        {
            "name": "Mephistopheles",
            "type": "Stout",
            "distributor": "Avery Brewing Company",
            "abv": "17.1%",
            "url": "https://en.wikipedia.org/wiki/Avery_Brewing_Company"
        },
        {
            "name": "The Maharaja",
            "type": "Imperial IPA",
            "distributor": "Avery Brewing Company",
            "abv": "10.2%",
            "url": "https://en.wikipedia.org/wiki/Avery_Brewing_Company"
        },
        {
            "name": "The Kaiser",
            "type": "Imperial Oktoberfest Lager",
            "distributor": "Avery Brewing Company",
            "abv": "9.3%",
            "url": "https://en.wikipedia.org/wiki/Avery_Brewing_Company"
        },
        {
            "name": "Utopias",
            "type": "Strong Ale",
            "distributor": "Samuel Adams",
            "abv": "28.0%",
            "url": "https://www.samueladams.com/our-beers/specialty-beers/utopias"
        },
        {
            "name": "Delirium Tremens",
            "type": "Belgian Strong Ale",
            "distributor": "Brouwerij Huyghe",
            "abv": "8.5%",
            "url": "https://www.delirium.be/en/beers/delirium-tremens"
        },
        {
            "name": "Gose Gone Wild",
            "type": "Sour Ale",
            "distributor": "Stillwater Artisanal",
            "abv": "4.3%",
            "url": "https://www.stillwater-artisanal.com/"
        },
        {
            "name": "Prairie Bomb!",
            "type": "Imperial Stout",
            "distributor": "Prairie Artisan Ales",
            "abv": "13.0%",
            "url": "https://prairieales.com/"
        },
        {
            "name": "Funky Buddha Maple Bacon Coffee Porter",
            "type": "Porter",
            "distributor": "Funky Buddha Brewery",
            "abv": "6.4%",
            "url": "https://funkybuddhabrewery.com/"
        },
        {
            "name": "Behemoth",
            "type": "Barleywine",
            "distributor": "Three Floyds Brewing",
            "abv": "10.5%",
            "url": "https://www.3floyds.com/"
        },
        {
            "name": "Zombie Dust",
            "type": "Pale Ale",
            "distributor": "Three Floyds Brewing",
            "abv": "6.5%",
            "url": "https://www.3floyds.com/"
        },
        {
            "name": "Two Women",
            "type": "Lager",
            "distributor": "New Glarus Brewing Company",
            "abv": "5.0%",
            "url": "https://www.newglarusbrewing.com/"
        },
        {
            "name": "Spotted Cow",
            "type": "Cream Ale",
            "distributor": "New Glarus Brewing Company",
            "abv": "4.8%",
            "url": "https://www.newglarusbrewing.com/"
        },
        {
            "name": "Trappistes Rochefort 10",
            "type": "Quadrupel",
            "distributor": "Abbaye de Rochefort",
            "abv": "11.3%",
            "url": "https://www.trappist.be/en/pages/trappist-rochefort"
        },
        {
            "name": "Westvleteren 12",
            "type": "Quadrupel",
            "distributor": "Westvleteren Brewery",
            "abv": "10.2%",
            "url": "https://www.sintsixtus.be/eng/brouwerij.htm"
        },
        {
            "name": "The Abyss",
            "type": "Imperial Stout",
            "distributor": "Deschutes Brewery",
            "abv": "11.0%",
            "url": "https://www.deschutesbrewery.com/"
        },
        {
            "name": "Chimay Blue",
            "type": "Belgian Strong Ale",
            "distributor": "Chimay Brewery",
            "abv": "9.0%",
            "url": "https://www.chimay.com/"
        },
        {
            "name": "Raspberry Tart",
            "type": "Fruit Beer",
            "distributor": "New Glarus Brewing Company",
            "abv": "4.0%",
            "url": "https://www.newglarusbrewing.com/"
        },
        {
            "name": "Black Tuesday",
            "type": "Imperial Stout",
            "distributor": "The Bruery",
            "abv": "20.0%",
            "url": "https://www.thebruery.com/"
        },
        {
            "name": "Arrogant Bastard Ale",
            "type": "Strong Ale",
            "distributor": "Stone Brewing",
            "abv": "7.2%",
            "url": "https://www.arrogantconsortia.com/"
        },
        {
            "name": "Sour Monkey",
            "type": "Sour Ale",
            "distributor": "Victory Brewing Company",
            "abv": "9.5%",
            "url": "https://victorybeer.com/"
        },
        {
            "name": "Cigar City Maduro",
            "type": "Brown Ale",
            "distributor": "Cigar City Brewing",
            "abv": "5.5%",
            "url": "https://www.cigarcitybrewing.com/"
        },
        {
            "name": "La Folie",
            "type": "Sour Brown Ale",
            "distributor": "New Belgium Brewing",
            "abv": "7.0%",
            "url": "https://www.newbelgium.com/"
        },
        {
            "name": "Chocolate Rain",
            "type": "Imperial Stout",
            "distributor": "The Bruery",
            "abv": "18.0%",
            "url": "https://www.thebruery.com/"
        },
        {
            "name": "Hop Rod Rye",
            "type": "Rye IPA",
            "distributor": "Bear Republic Brewing Company",
            "abv": "8.0%",
            "url": "https://bearrepublic.com/"
        },
        {
            "name": "Allagash Coolship Resurgam",
            "type": "Wild Ale",
            "distributor": "Allagash Brewing Company",
            "abv": "6.3%",
            "url": "https://www.allagash.com/"
        },
        {
            "name": "Supplication",
            "type": "Sour Ale",
            "distributor": "Russian River Brewing Company",
            "abv": "7.0%",
            "url": "https://www.russianriverbrewing.com/"
        },
        {
            "name": "Cantillon Gueuze",
            "type": "Gueuze",
            "distributor": "Brasserie Cantillon",
            "abv": "5.0%",
            "url": "https://www.cantillon.be/"
        }
    ]
    ,    
    Liquor: [
      { name: 'Bourbon Reserve', type: 'Bourbon', distributor: 'Spirit Dist', abv: '40%' },
      { name: 'Highland Scotch', type: 'Scotch', distributor: 'Highland Spirits', abv: '43%' },
      { name: 'Aged Tequila', type: 'Tequila', distributor: 'Premium Spirits', abv: '38%' },
      { name: 'Craft Vodka', type: 'Vodka', distributor: 'Pure Spirits', abv: '40%' },
      { name: 'Spiced Rum', type: 'Rum', distributor: 'Island Spirits', abv: '35%' },
      { name: 'Gin Botanical', type: 'Gin', distributor: 'Herbal Spirits', abv: '42%' },
      { name: 'Mezcal Artisanal', type: 'Mezcal', distributor: 'Agave Spirits', abv: '45%' },
      { name: 'Single Malt', type: 'Whiskey', distributor: 'Highland Best', abv: '43%' },
      { name: 'Cognac VSOP', type: 'Cognac', distributor: 'French Spirits', abv: '40%' },
      { name: 'Aged Brandy', type: 'Brandy', distributor: 'Classic Spirits', abv: '38%' }
    ],
    Wine: [
      { name: 'Napa Valley Red', type: 'Red Blend', distributor: 'Wine Valley', abv: '13.5%' },
      { name: 'Pinot Noir Reserve', type: 'Pinot Noir', distributor: 'Vineyard Select', abv: '14.2%' },
      { name: 'Chardonnay Elite', type: 'Chardonnay', distributor: 'Wine Estates', abv: '12.5%' },
      { name: 'Rosé Special', type: 'Rosé', distributor: 'Summer Wines', abv: '11.5%' },
      { name: 'Sauvignon Blanc', type: 'Sauvignon Blanc', distributor: 'Valley Vines', abv: '12.0%' },
      { name: 'Merlot Reserve', type: 'Merlot', distributor: 'Classic Vintners', abv: '13.8%' },
      { name: 'Riesling Select', type: 'Riesling', distributor: 'Rhine Valley', abv: '11.0%' },
      { name: 'Cabernet Premium', type: 'Cabernet', distributor: 'Estate Select', abv: '14.5%' },
      { name: 'Zinfandel Bold', type: 'Zinfandel', distributor: 'Bold Vines', abv: '15.2%' },
      { name: 'Syrah Reserve', type: 'Syrah', distributor: 'Valley Select', abv: '14.8%' }
    ]
  };

  const currentItems = filterResults(dummyResults[displayType]);  
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  const displayedItems = currentItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="search-results">
      <ResultCards currentItems={displayedItems} isTransitioning={isTransitioning} />
      <ResultPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
export default SearchResults;