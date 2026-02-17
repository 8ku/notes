const areaOptions = [
  { value: 'all', label: 'All Areas', leftLabel: 'All Areas on Left', rightLabel: 'All Areas on Right', areaChecked: true, leftChecked: false, rightChecked: false },
  { value: 'China', label: 'China', areaChecked: false, leftChecked: true, rightChecked: false },
  { value: 'Japan', label: 'Japan', areaChecked: false, leftChecked: false, rightChecked: true },
  { value: 'Greece', label: 'Greece', areaChecked: false, leftChecked: false, rightChecked: true },
  { value: 'Rome', label: 'Rome', areaChecked: false, leftChecked: false, rightChecked: true },
  { value: 'UK', label: 'UK', areaChecked: false, leftChecked: false, rightChecked: true },
  { value: 'France', label: 'France', areaChecked: false, leftChecked: false, rightChecked: true },
  { value: 'Europe', label: 'Europe', areaChecked: false, leftChecked: false, rightChecked: true },
  { value: 'North America', label: 'North America', areaChecked: false, leftChecked: false, rightChecked: true },
  { value: 'Latin America', label: 'Latin America', areaChecked: false, leftChecked: false, rightChecked: true },
  { value: 'South America', label: 'South America', areaChecked: false, leftChecked: false, rightChecked: true },
  { value: 'India', label: 'India', areaChecked: false, leftChecked: false, rightChecked: true },
  { value: 'Africa', label: 'Africa', areaChecked: false, leftChecked: false, rightChecked: true }
];

function generateAreaList(options, type) {
  return options.map(opt => {
    let label = opt.label;
    let checked = opt[type + 'Checked'] ? 'checked' : '';
    let className = type === 'area' ? 'area-option' : `side-${type}-option`;
    if (type === 'left' && opt.leftLabel) label = opt.leftLabel;
    if (type === 'right' && opt.rightLabel) label = opt.rightLabel;
    return `<label><input type="checkbox" class="${className}" value="${opt.value}" ${checked}> ${label}</label>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', function() {
  // Populate the lists
  document.querySelector('#dropdownAreaMenu .area-list').innerHTML = generateAreaList(areaOptions, 'area');
  document.querySelector('.leftList').innerHTML = generateAreaList(areaOptions, 'left');
  document.querySelector('.rightList').innerHTML = generateAreaList(areaOptions, 'right');

  const dropdownAreaButton = document.getElementById('dropdownAreaButton');
  const dropdownAreaMenu = document.getElementById('dropdownAreaMenu');
  const confirmAreaButton = document.getElementById('confirmAreaSelection');
  const areaCheckboxes = document.querySelectorAll('.area-option');

  const dropdownSideButton = document.getElementById('dropdownSideButton');
  const dropdownSideMenu = document.getElementById('dropdownSideMenu');
  const confirmSideButton = document.getElementById('confirmSideSelection');
  const sideLeftOptions = document.querySelectorAll('.side-left-option');
  const sideRightOptions = document.querySelectorAll('.side-right-option');

  const confirmDateSelection = document.getElementById('confirmDateSelection');

  // switch control
  var toggleSwitch = document.getElementById('toggleFilters');
  var filterWrapper = document.querySelector('.filter-wrapper');

  function setFilterVisibility(show) {
    if (!filterWrapper) return;
    filterWrapper.style.display = show ? 'block' : 'none';
    document.documentElement.style.setProperty('--filter-popup-width', show ? '260px' : '80px');
  }

  function updateTimelineCenteredClass() {
    const timeline = document.getElementById('conference-timeline');
    if (!timeline || !filterWrapper) return;
    const isHidden = window.getComputedStyle(filterWrapper).display === 'none';
    timeline.classList.toggle('timeline-centered', isHidden);
  }

  // initialize from current toggle state
  if (toggleSwitch) {
    setFilterVisibility(toggleSwitch.checked);
    updateTimelineCenteredClass();
    toggleSwitch.addEventListener('change', function() {
      setFilterVisibility(this.checked);
      updateTimelineCenteredClass();
    });
  }

  // Initialize noUiSlider for date range
  var dateSlider = document.getElementById('dateSliderContainer');
  noUiSlider.create(dateSlider, {
    start: [-1000, 3000],
    connect: true,
    step: 100,
    range: {
      'min': -1000,
      'max': 3000
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
  var filterStartDate = -1000, filterEndDate = 3000;
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
      const max = 2050;
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
      const max = 2050;
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

  // Toggle Side Dropdown
  dropdownSideButton.addEventListener('click', function() {
    dropdownSideMenu.style.display = dropdownSideMenu.style.display === 'block' ? 'none' : 'block';
    });


  // Handle confirm button for date range
  document.getElementById('confirmDateSelection').addEventListener('click', filterContent);

  // Handle confirm button for area filter
  document.getElementById('confirmAreaSelection').addEventListener('click', function(){
    filterContent();
    dropdownAreaMenu.style.display = 'none';
  });

  // Handle confirm button for side filter
  document.getElementById('confirmSideSelection').addEventListener('click', function(){
    filterContent();
    dropdownSideMenu.style.display = 'none';
  });

  // Prevent dropdown from closing when clicking inside
  function preventDropdownClose(event) {
    event.stopPropagation();
  }

  dropdownAreaMenu.addEventListener('click', preventDropdownClose);

  dropdownSideMenu.addEventListener('click', preventDropdownClose);


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

  // Function to update selected side display
  function updateSelectedSideDisplay() {
    const selectedLeftAreas = Array.from(document.querySelectorAll('.side-left-option:checked'))
      .map(chk => chk.value)
      .filter(val => val !== 'all');
    
    const selectedRightAreas = Array.from(document.querySelectorAll('.side-right-option:checked'))
      .map(chk => chk.value)
      .filter(val => val !== 'all');
    
    const displayElement = document.getElementById('selectedSideDisplay');
    
    let text = '';
    if (selectedLeftAreas.length > 0) {
      text += selectedLeftAreas.join(', ') + ' on left';
    }
    if (selectedRightAreas.length > 0) {
      if (text) text += ', ';
      text += selectedRightAreas.join(', ') + ' on right';
    }
    if (!text) {
      text = 'No selection';
    }
    displayElement.textContent = text;
    displayElement.className = 'selected-areas-display';
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

  // Handle checkbox logic for side left
  sideLeftOptions.forEach(chk => {
    chk.addEventListener('change', function(event) {
      preventDropdownClose(event);
      if (this.checked) {
        if (this.value === 'all') {
          sideLeftOptions.forEach(box => {
            if (box.value !== 'all') box.checked = false;
          });
          // Uncheck all on right
          sideRightOptions.forEach(box => box.checked = false);
        } else {
          document.querySelector('.side-left-option[value="all"]').checked = false;
          // Uncheck the same value on right
          const rightBoxes = document.querySelectorAll('.side-right-option');
          const rightBox = Array.from(rightBoxes).find(box => box.value === this.value);
          if (rightBox) rightBox.checked = false;
        }
      }
      updateVisibility();
      updateSelectedSideDisplay();
    });
  });

  // Handle checkbox logic for side right
  sideRightOptions.forEach(chk => {
    chk.addEventListener('change', function(event) {
      preventDropdownClose(event);
      if (this.checked) {
        if (this.value === 'all') {
          sideRightOptions.forEach(box => {
            if (box.value !== 'all') box.checked = false;
          });
          // Uncheck all on left
          sideLeftOptions.forEach(box => box.checked = false);
        } else {
          document.querySelector('.side-right-option[value="all"]').checked = false;
          // Uncheck the same value on left
          const leftBoxes = document.querySelectorAll('.side-left-option');
          const leftBox = Array.from(leftBoxes).find(box => box.value === this.value);
          if (leftBox) leftBox.checked = false;
        }
      }
      updateVisibility();
      updateSelectedSideDisplay();
    });
  });

  // Handle check all buttons
  let leftAllChecked = false;
  const toggleAllLeft = document.getElementById('toggleAllLeft');
  if (toggleAllLeft) {
    toggleAllLeft.addEventListener('click', function() {
      if (leftAllChecked) {
        // Uncheck all
        sideLeftOptions.forEach(box => {
          if (box.value !== 'all') {
            box.checked = false;
          }
        });
        toggleAllLeft.textContent = 'Check All';
        leftAllChecked = false;
      } else {
        // Check all visible
        sideLeftOptions.forEach(box => {
          if (box.value !== 'all' && box.closest('label').style.display !== 'none') {
            box.checked = true;
          }
        });
        toggleAllLeft.textContent = 'Uncheck All';
        leftAllChecked = true;
      }
      updateVisibility();
      updateSelectedSideDisplay();
    });
  }

  let rightAllChecked = false;
  const toggleAllRight = document.getElementById('toggleAllRight');
  if (toggleAllRight) {
    toggleAllRight.addEventListener('click', function() {
      if (rightAllChecked) {
        // Uncheck all
        sideRightOptions.forEach(box => {
          if (box.value !== 'all') {
            box.checked = false;
          }
        });
        toggleAllRight.textContent = 'Check All';
        rightAllChecked = false;
      } else {
        // Check all visible
        sideRightOptions.forEach(box => {
          if (box.value !== 'all' && box.closest('label').style.display !== 'none') {
            box.checked = true;
          }
        });
        toggleAllRight.textContent = 'Uncheck All';
        rightAllChecked = true;
      }
      updateVisibility();
      updateSelectedSideDisplay();
    });
  }

  // Initialize button states based on default checks
  // For left: only China checked, not all
  leftAllChecked = false;
  if (toggleAllLeft) toggleAllLeft.textContent = 'Check All';
  // For right: all visible (except China) are checked
  rightAllChecked = true;
  if (toggleAllRight) toggleAllRight.textContent = 'Uncheck All';

  // Function to update visibility of checkboxes
  function updateVisibility() {
    const allLeftChecked = document.querySelector('.side-left-option[value="all"]').checked;
    const allRightChecked = document.querySelector('.side-right-option[value="all"]').checked;
    const checkedLeft = new Set();
    sideLeftOptions.forEach(box => { if (box.checked && box.value !== 'all') checkedLeft.add(box.value); });
    const checkedRight = new Set();
    sideRightOptions.forEach(box => { if (box.checked && box.value !== 'all') checkedRight.add(box.value); });

    sideRightOptions.forEach(box => {
      if (box.value === 'all') return;
      const label = box.closest('label');
      if (label) {
        if (allLeftChecked || checkedLeft.has(box.value)) {
          label.style.display = 'none';
        } else {
          label.style.display = '';
        }
      }
    });

    sideLeftOptions.forEach(box => {
      if (box.value === 'all') return;
      const label = box.closest('label');
      if (label) {
        if (allRightChecked || checkedRight.has(box.value)) {
          label.style.display = 'none';
        } else {
          label.style.display = '';
        }
      }
    });
  }

  // Initialize display on page load
  updateSelectedAreasDisplay();
  updateSelectedSideDisplay();
  updateVisibility();


  // Combined filter function
function filterContent() {
  const selectedAreas = Array.from(document.querySelectorAll('.area-option:checked')).map(chk => chk.value);
  const selectedLeftAreas = Array.from(document.querySelectorAll('.side-left-option:checked')).map(chk => chk.value);
  const selectedRightAreas = Array.from(document.querySelectorAll('.side-right-option:checked')).map(chk => chk.value);
  const articles = document.querySelectorAll('.timeline-article');

  articles.forEach(article => {
    const containers = article.querySelectorAll('.content-left-container, .content-right-container');
    let hasVisibleContainer = false;

    containers.forEach(container => {
      const area = container.querySelector('.area')?.textContent.trim();
      // Area filter
      const areaMatch = selectedAreas.includes('all') || !area || selectedAreas.includes(area);
      // Date filter
      const dateMatch = Array.from(container.querySelectorAll('.century')).some(centuryEl => {
        const year = convertTextToYear(centuryEl.textContent.trim());
        return year >= filterStartDate && year <= filterEndDate;
      });

      if (!areaMatch || !dateMatch) {
        container.style.display = 'none';
      } else {
        // Side assignment
        if (selectedLeftAreas.includes('all') || selectedLeftAreas.includes(area)) {
          container.className = 'content-left-container';
          // Update inner content div class to match
          const innerContent = container.querySelector('.content-left, .content-right');
          if (innerContent) {
            innerContent.className = 'content-left';
          }
          container.style.display = '';
          hasVisibleContainer = true;
        } else if (selectedRightAreas.includes('all') || selectedRightAreas.includes(area)) {
          container.className = 'content-right-container';
          // Update inner content div class to match
          const innerContent = container.querySelector('.content-left, .content-right');
          if (innerContent) {
            innerContent.className = 'content-right';
          }
          container.style.display = '';
          hasVisibleContainer = true;
        } else {
          container.style.display = 'none';
        }
      }
    });

    article.style.display = hasVisibleContainer ? '' : 'none';
  });

  // Adapt vertical timeline and article positions
  adaptVerticalTimeline(filterStartDate, filterEndDate);
}

function adaptVerticalTimeline(startYear, endYear) {
  const timelineBar = document.querySelector('.conference-center-line');
  const articles = Array.from(document.querySelectorAll('.timeline-article'));

  // Filter visible articles (already hidden by filterContent, but get the list)
  const visibleArticles = articles.filter(article => article.style.display !== 'none');

  // Reset positioning
  articles.forEach(article => {
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