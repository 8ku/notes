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
  var selectedStartDate, selectedEndDate

  dateSlider.noUiSlider.on('update', function (values) {
    selectedStartDate = parseInt(values[0]);
    selectedEndDate = parseInt(values[1]);
    startSpan.innerHTML = formatYear(selectedStartDate);
    endSpan.innerHTML = formatYear(selectedEndDate);
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
    });
  });


  // Combined filter function
function filterContent() {
  const selectedAreas = Array.from(document.querySelectorAll('.area-option:checked')).map(chk => chk.value);
  const containers = document.querySelectorAll('.timeline-article .content-left-container, .timeline-article .content-right-container');

  containers.forEach(container => {
    const area = container.querySelector('.area')?.textContent.trim();
    const areaMatch = selectedAreas.includes('all') || selectedAreas.includes(area);
    const dateMatch = Array.from(container.querySelectorAll('.century')).some(centuryEl => {
      const year = convertTextToYear(centuryEl.textContent.trim());
      return year >= selectedStartDate && year <= selectedEndDate;
    });

    container.style.display = (areaMatch && dateMatch) ? '' : 'none';
  });

  // Adapt vertical timeline and article positions
  adaptVerticalTimeline(selectedStartDate, selectedEndDate);
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

  // Convert a text like "2600 BC" or "300 AD" to a year number
  function convertTextToYear(text) {
    if (!text) return NaN;
    const parts = text.split(' ');
    const year = parseInt(parts[0]);
    return parts[1] === 'BC' ? -year : year;
  }
});