import React, { useState } from 'react';
import ResultCards from './ResultCards';
import ResultPagination from './ResultPagination';
import './SearchResults.css';

const SearchResults = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const itemsPerPage = 15;

  const dummyResults = [
    // Page 1
    { name: 'Hoppy Wonder IPA', type: 'IPA', distributor: 'Craft Co', abv: '6.5%' },
    { name: 'Bourbon Reserve', type: 'Bourbon', distributor: 'Spirit Dist', abv: '40%' },
    { name: 'Napa Valley Red', type: 'Wine', distributor: 'Wine Valley', abv: '13.5%' },
    { name: 'Citrus Wheat Ale', type: 'Wheat Beer', distributor: 'Brew Masters', abv: '5.2%' },
    { name: 'Highland Scotch', type: 'Scotch', distributor: 'Highland Spirits', abv: '43%' },
    { name: 'Pinot Noir Reserve', type: 'Wine', distributor: 'Vineyard Select', abv: '14.2%' },
    { name: 'Double Stout', type: 'Stout', distributor: 'Dark Brew Co', abv: '8.0%' },
    { name: 'Aged Tequila', type: 'Tequila', distributor: 'Premium Spirits', abv: '38%' },
    { name: 'Chardonnay Elite', type: 'Wine', distributor: 'Wine Estates', abv: '12.5%' },
    { name: 'Belgian Tripel', type: 'Tripel', distributor: 'Euro Imports', abv: '9.5%' },
    { name: 'Craft Vodka', type: 'Vodka', distributor: 'Pure Spirits', abv: '40%' },
    { name: 'Rosé Special', type: 'Wine', distributor: 'Summer Wines', abv: '11.5%' },
    { name: 'Pale Ale Classic', type: 'Pale Ale', distributor: 'Hop House', abv: '5.8%' },
    { name: 'Spiced Rum', type: 'Rum', distributor: 'Island Spirits', abv: '35%' },
    { name: 'Sauvignon Blanc', type: 'Wine', distributor: 'Valley Vines', abv: '12.0%' },
    // Page 2
    { name: 'Porter Premium', type: 'Porter', distributor: 'Dark Arts Brewing', abv: '7.2%' },
    { name: 'Gin Botanical', type: 'Gin', distributor: 'Herbal Spirits', abv: '42%' },
    { name: 'Merlot Reserve', type: 'Wine', distributor: 'Classic Vintners', abv: '13.8%' },
    { name: 'Hefeweizen Gold', type: 'Wheat Beer', distributor: 'German Imports', abv: '5.4%' },
    { name: 'Mezcal Artisanal', type: 'Mezcal', distributor: 'Agave Spirits', abv: '45%' },
    { name: 'Riesling Select', type: 'Wine', distributor: 'Rhine Valley', abv: '11.0%' },
    { name: 'Amber Ale', type: 'Ale', distributor: 'Copper Kettle', abv: '5.6%' },
    { name: 'Single Malt', type: 'Whiskey', distributor: 'Highland Best', abv: '43%' },
    { name: 'Cabernet Premium', type: 'Wine', distributor: 'Estate Select', abv: '14.5%' },
    { name: 'Lager Classic', type: 'Lager', distributor: 'Pure Brew Co', abv: '4.8%' },
    { name: 'Cognac VSOP', type: 'Cognac', distributor: 'French Spirits', abv: '40%' },
    { name: 'Zinfandel Bold', type: 'Wine', distributor: 'Bold Vines', abv: '15.2%' },
    { name: 'Pilsner Light', type: 'Pilsner', distributor: 'Czech Imports', abv: '4.5%' },
    { name: 'Aged Brandy', type: 'Brandy', distributor: 'Classic Spirits', abv: '38%' },
    { name: 'Syrah Reserve', type: 'Wine', distributor: 'Valley Select', abv: '14.8%' },
    // Page 3
    { name: 'Dunkel Dark', type: 'Dunkel', distributor: 'Bavaria Best', abv: '5.1%' },
    { name: 'Craft Rum', type: 'Rum', distributor: 'Caribbean Spirits', abv: '37%' },
    { name: 'Grenache Blend', type: 'Wine', distributor: 'Spanish Vines', abv: '14.0%' },
    { name: 'Bock Beer', type: 'Bock', distributor: 'German Craft', abv: '6.8%' },
    { name: 'Aged Whiskey', type: 'Whiskey', distributor: 'Kentucky Best', abv: '45%' },
    { name: 'Prosecco Extra', type: 'Wine', distributor: 'Italian Bubbles', abv: '11.5%' },
    { name: 'Kölsch Light', type: 'Kölsch', distributor: 'Cologne Craft', abv: '4.8%' },
    { name: 'Premium Sake', type: 'Sake', distributor: 'Japan Import', abv: '15%' },
    { name: 'Malbec Reserve', type: 'Wine', distributor: 'Argentina Best', abv: '13.9%' },
    { name: 'Sour Ale', type: 'Sour', distributor: 'Wild Ferment', abv: '5.5%' },
    { name: 'Aged Port', type: 'Port', distributor: 'Portugal Fine', abv: '20%' },
    { name: 'Tempranillo', type: 'Wine', distributor: 'Rioja Select', abv: '13.5%' },
    { name: 'Rauchbier', type: 'Smoked Beer', distributor: 'Smoke House', abv: '5.2%' },
    { name: 'Grappa Select', type: 'Grappa', distributor: 'Italian Spirits', abv: '40%' },
    { name: 'Moscato Sweet', type: 'Wine', distributor: 'Sweet Valley', abv: '5.5%' },
    // Page 4
    { name: 'Gose Salt', type: 'Gose', distributor: 'Salt Brew Co', abv: '4.2%' },
    { name: 'Absinthe Green', type: 'Absinthe', distributor: 'French Select', abv: '68%' },
    { name: 'Barolo Red', type: 'Wine', distributor: 'Italian Estate', abv: '14.5%' },
    { name: 'Weizenbock', type: 'Wheat Bock', distributor: 'Munich Best', abv: '7.5%' },
    { name: 'Aged Armagnac', type: 'Armagnac', distributor: 'French Reserve', abv: '40%' },
    { name: 'Gewürztraminer', type: 'Wine', distributor: 'Alsace Vines', abv: '13.5%' },
    { name: 'Lambic Fruit', type: 'Lambic', distributor: 'Belgian Wild', abv: '5.0%' },
    { name: 'Cachaça Pure', type: 'Cachaça', distributor: 'Brazil Spirit', abv: '38%' },
    { name: 'Sangiovese', type: 'Wine', distributor: 'Tuscan Select', abv: '13.5%' },
    { name: 'Altbier', type: 'Alt', distributor: 'German Classic', abv: '4.9%' },
    { name: 'Aquavit Spice', type: 'Aquavit', distributor: 'Nordic Spirit', abv: '42%' },
    { name: 'Verdejo White', type: 'Wine', distributor: 'Spanish White', abv: '12.5%' },
    { name: 'Märzen', type: 'Märzen', distributor: 'October Best', abv: '5.8%' },
    { name: 'Pisco Pure', type: 'Pisco', distributor: 'Peru Spirit', abv: '40%' },
    { name: 'Viognier', type: 'Wine', distributor: 'French White', abv: '13.5%' },
    // Page 5
    { name: 'Schwarzbier', type: 'Black Beer', distributor: 'Dark German', abv: '4.8%' },
    { name: 'Baijiu Elite', type: 'Baijiu', distributor: 'China Spirit', abv: '53%' },
    { name: 'Nebbiolo', type: 'Wine', distributor: 'Italian Red', abv: '14.0%' },
    { name: 'Quadrupel', type: 'Quad', distributor: 'Abbey Brew', abv: '10.2%' },
    { name: 'Slivovitz', type: 'Brandy', distributor: 'Balkan Spirit', abv: '45%' },
    { name: 'Albariño', type: 'Wine', distributor: 'Spanish Coast', abv: '12.5%' },
    { name: 'Berliner Weisse', type: 'Sour Wheat', distributor: 'Berlin Best', abv: '3.5%' },
    { name: 'Ouzo Classic', type: 'Ouzo', distributor: 'Greek Spirit', abv: '38%' },
    { name: 'Chenin Blanc', type: 'Wine', distributor: 'Loire Valley', abv: '13.0%' },
    { name: 'Doppelbock', type: 'Bock', distributor: 'Strong German', abv: '7.8%' },
    { name: 'Pastis', type: 'Anise Spirit', distributor: 'French Anise', abv: '45%' },
    { name: 'Grüner Veltliner', type: 'Wine', distributor: 'Austrian White', abv: '12.0%' },
    { name: 'Kellerbier', type: 'Lager', distributor: 'Cellar Brew', abv: '5.2%' },
    { name: 'Raki Clear', type: 'Raki', distributor: 'Turkish Spirit', abv: '45%' },
    { name: 'Sauternes', type: 'Wine', distributor: 'Sweet French', abv: '14.0%' }
  ];

  const totalPages = Math.ceil(dummyResults.length / itemsPerPage);
  const currentItems = dummyResults.slice(
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
      <ResultCards currentItems={currentItems} isTransitioning={isTransitioning} />
      <ResultPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchResults;