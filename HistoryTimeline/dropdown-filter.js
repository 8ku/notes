document.addEventListener('DOMContentLoaded', function() {
  const dropdownAreaButton = document.getElementById('dropdownAreaButton');
  const dropdownAreaMenu = document.getElementById('dropdownAreaMenu');
  const confirmAreaButton = document.getElementById('confirmAreaSelection');
  const areaCheckboxes = document.querySelectorAll('.area-option');

  const confirmDateSelection = document.getElementById('confirmDateSelection');

  // switch control
  var toggleSwitch = document.getElementById('toggleFilters');
  var filterWrapper = document.querySelector('.filter-wrapper');

  toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
      filterWrapper.style.display = 'block';
    } else {
      filterWrapper.style.display = 'none';
    }
  });

  // Initialize noUiSlider for date range
  var dateSlider = document.getElementById('dateSliderContainer');
  noUiSlider.create(dateSlider, {
    start: [-3000, 2000],
    connect: true,
    step: 100,
    range: {
      'min': -3000,
      'max': 2000
    },
    format: {
      to: function(value) {
        return parseInt(value);
      },
      from: function(value) {
        return parseInt(value);
      }
    }
  });

  var startSpan = document.getElementById('dateRangeStart');
  var endSpan = document.getElementById('dateRangeEnd');
  var startDateInput = document.getElementById('startDateInput');
  var endDateInput = document.getElementById('endDateInput');
  // `filterStartDate`/`filterEndDate` hold the exact filter values (from inputs).
  // The slider itself snaps to 100-year steps for visual control.
  var filterStartDate = -3000, filterEndDate = 2000;
  var isUpdatingFromInput = false;

  // Function to parse user input to year number
  function parseUserDateInput(input) {
    if (!input || input.trim() === '') return null;
    
    const cleaned = input.replace(/,/g, '').trim();
    const upper = cleaned.toUpperCase();
    
    // Extract the first numeric token (integer or decimal)
    const numMatch = cleaned.match(/-?\d+(?:\.\d+)?/);
    if (!numMatch) return null;
    const num = parseFloat(numMatch[0]);
    
    // Handle tokens indicating years before present
    if (upper.includes('BC') || upper.includes('BP')) {
      return -Math.round(num);
    }
    
    // Handle million-years-ago like "Mya" (convert to negative large number)
    if (upper.includes('MYA')) {
      return -Math.round(num * 1e6);
    }
    
    // Default: AD / plain year
    return Math.round(num);
  }

  dateSlider.noUiSlider.on('update', function (values) {
    var sliderStart = parseInt(values[0]);
    var sliderEnd = parseInt(values[1]);

    // If the update comes from typing (we set `isUpdatingFromInput`),
    // keep the exact typed filter values and only use the slider for visual position.
    if (!isUpdatingFromInput) {
      filterStartDate = sliderStart;
      filterEndDate = sliderEnd;
      startDateInput.value = formatYear(filterStartDate);
      endDateInput.value = formatYear(filterEndDate);
    }

    // Always display the exact filter values (typed or slid)
    startSpan.innerHTML = formatYear(filterStartDate);
    endSpan.innerHTML = formatYear(filterEndDate);
  });

  // Handle start date input
  startDateInput.addEventListener('change', function() {
    const newStartDate = parseUserDateInput(this.value);
    if (newStartDate !== null && newStartDate <= filterEndDate) {
      filterStartDate = newStartDate;
      startSpan.innerHTML = formatYear(filterStartDate);

      // Snap the slider visually to the nearest 100-year step, keep exact filter value.
      isUpdatingFromInput = true;
      const step = 100;
      const min = -3000;
      const max = 2000;
      const snapped = Math.max(min, Math.min(max, Math.round(newStartDate / step) * step));
      dateSlider.noUiSlider.set([snapped, null]);
      isUpdatingFromInput = false;

      filterContent();
    } else if (newStartDate !== null) {
      alert('Start date must be before end date');
      startDateInput.value = formatYear(filterStartDate);
    }
  });

  // Handle end date input
  endDateInput.addEventListener('change', function() {
    const newEndDate = parseUserDateInput(this.value);
    if (newEndDate !== null && newEndDate >= filterStartDate) {
      filterEndDate = newEndDate;
      endSpan.innerHTML = formatYear(filterEndDate);

      // Snap the slider visually to the nearest 100-year step, keep exact filter value.
      isUpdatingFromInput = true;
      const step = 100;
      const min = -3000;
      const max = 2000;
      const snapped = Math.max(min, Math.min(max, Math.round(newEndDate / step) * step));
      dateSlider.noUiSlider.set([null, snapped]);
      isUpdatingFromInput = false;

      filterContent();
    } else if (newEndDate !== null) {
      alert('End date must be after start date');
      endDateInput.value = formatYear(filterEndDate);
    }
  });

  // Function to format year for display
  function formatYear(value) {
    return value < 0 ? `${Math.abs(value)} BC` : `${value} AD`;
  }


  // Toggle Area Dropdown
  dropdownAreaButton.addEventListener('click', function() {
    dropdownAreaMenu.style.display = dropdownAreaMenu.style.display === 'block' ? 'none' : 'block';
    });


  // Handle confirm button for date range
  document.getElementById('confirmDateSelection').addEventListener('click', filterContent);

  // Handle confirm button for area filter
  document.getElementById('confirmAreaSelection').addEventListener('click', function(){
    filterContent();
    dropdownAreaMenu.style.display = 'none';
  });

  // Prevent dropdown from closing when clicking inside
  function preventDropdownClose(event) {
    event.stopPropagation();
  }

  dropdownAreaMenu.addEventListener('click', preventDropdownClose);


  // Function to update selected areas display
  function updateSelectedAreasDisplay() {
    const selectedAreas = Array.from(document.querySelectorAll('.area-option:checked'))
      .map(chk => chk.value)
      .filter(val => val !== 'all');
    
    const displayElement = document.getElementById('selectedAreasDisplay');
    
    if (selectedAreas.length === 0 || selectedAreas.length === areaCheckboxes.length - 1) {
      displayElement.textContent = 'All Areas';
      displayElement.className = 'selected-areas-display all-selected';
    } else if (selectedAreas.length === 1 && document.querySelector('.area-option[value="all"]').checked) {
      displayElement.textContent = 'All Areas';
      displayElement.className = 'selected-areas-display all-selected';
    } else {
      displayElement.textContent = selectedAreas.join(', ');
      displayElement.className = 'selected-areas-display';
    }
  }

  // Handle checkbox logic
  areaCheckboxes.forEach(chk => {
    chk.addEventListener('change', function(event) {
      preventDropdownClose(event);
      if (this.value === 'all') {
        areaCheckboxes.forEach(box => {
          if (box.value !== 'all') box.checked = false;
        });
      } else {
        document.querySelector('.area-option[value="all"]').checked = false;
      }
      updateSelectedAreasDisplay();
    });
  });

  // Initialize display on page load
  updateSelectedAreasDisplay();


  // Combined filter function
function filterContent() {
  const selectedAreas = Array.from(document.querySelectorAll('.area-option:checked')).map(chk => chk.value);
  const containers = document.querySelectorAll('.timeline-article .content-left-container, .timeline-article .content-right-container');

  containers.forEach(container => {
    const area = container.querySelector('.area')?.textContent.trim();
    // If 'all' is selected, show all areas. If no area class, show it (not filtered by area).
    // Otherwise, area must match a selected option.
    const areaMatch = selectedAreas.includes('all') || !area || selectedAreas.includes(area);
    const dateMatch = Array.from(container.querySelectorAll('.century')).some(centuryEl => {
      const year = convertTextToYear(centuryEl.textContent.trim());
      return year >= filterStartDate && year <= filterEndDate;
    });

    container.style.display = (areaMatch && dateMatch) ? '' : 'none';
  });

  // Adapt vertical timeline and article positions
  adaptVerticalTimeline(filterStartDate, filterEndDate);
}

function adaptVerticalTimeline(startYear, endYear) {
  const timelineBar = document.querySelector('.conference-center-line');
  const articles = Array.from(document.querySelectorAll('.timeline-article'));

  // Filter visible articles
  const visibleArticles = articles.filter(article => {
    const centuryEl = article.querySelector('.century');
    if (!centuryEl) return false;
    const year = convertTextToYear(centuryEl.textContent.trim());
    return !isNaN(year) && year >= startYear && year <= endYear;
  });

  // Show/hide articles
  articles.forEach(article => {
    if (visibleArticles.includes(article)) {
      article.style.display = '';
    } else {
      article.style.display = 'none';
    }
    // Reset positioning
    article.style.position = 'relative';
    article.style.top = '';
  });

  // Calculate total height of visible articles
  let totalHeight = 0;
  visibleArticles.forEach(article => {
    article.style.height = 'auto';
    totalHeight += article.offsetHeight;
  });
  // Add gap between articles
  const gap = 40;
  totalHeight += gap * (visibleArticles.length - 1);

  // Set only the timeline bar height
  if (timelineBar) {
    // timelineBar.style.height = totalHeight + 'px';
  }
  // Remove any height set on containers
  const timelineContent = document.querySelector('.conference-timeline-content');
  if (timelineContent) {
    timelineContent.style.height = '';
  }
  const timelineContainer = document.getElementById('conference-timeline');
  if (timelineContainer) {
    timelineContainer.style.height = '';
  }
}

  // Convert a text like "2600 BC", "300 AD", "10,200 BP" or "3.3 Mya" to a year number
  function convertTextToYear(text) {
    if (!text) return NaN;
    // Normalize and remove commas
    const cleaned = text.replace(/,/g, '').trim();
    const upper = cleaned.toUpperCase();

    // Extract the first numeric token (integer or decimal)
    const numMatch = cleaned.match(/-?\d+(?:\.\d+)?/);
    if (!numMatch) return NaN;
    const num = parseFloat(numMatch[0]);

    // Handle tokens indicating years before present
    if (upper.includes('BC') || upper.includes('BP')) {
      return -Math.round(num);
    }

    // Handle million-years-ago like "Mya" (convert to negative large number)
    if (upper.includes('MYA')) {
      return -Math.round(num * 1e6);
    }

    // Default: AD / plain year
    return Math.round(num);
  }
});