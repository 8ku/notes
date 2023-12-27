document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.getElementById('dropdownMenuButton');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const confirmButton = document.getElementById('confirmSelection');

    // Toggle dropdown menu
    dropdownButton.addEventListener('click', function() {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Confirm selection and hide dropdown
    confirmButton.addEventListener('click', function() {
        filterContainers();
        dropdownMenu.style.display = 'none';
    });

    // Prevent dropdown from closing when clicking inside
    dropdownMenu.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Close dropdown if clicked outside
    window.onclick = function(event) {
        if (!event.target.matches('.dropdown-button')) {
            dropdownMenu.style.display = 'none';
        }
    };

    // Checkbox logic
    const checkboxes = document.querySelectorAll('.area-option');
    checkboxes.forEach(chk => {
        chk.addEventListener('change', function(event) {
            event.stopPropagation();
            if (this.value === 'all') {
                checkboxes.forEach(box => {
                    if (box.value !== 'all') box.checked = false;
                });
            } else {
                document.querySelector('.area-option[value="all"]').checked = false;
            }
        });
    });
});

function filterContainers() {
    const selectedAreas = Array.from(document.querySelectorAll('.area-option:checked')).map(chk => chk.value);
    const containers = document.querySelectorAll('.timeline-article .content-left-container, .timeline-article .content-right-container');

    containers.forEach(container => {
        const area = container.querySelector('.area')?.textContent.trim();
        container.style.display = (selectedAreas.includes('all') || selectedAreas.includes(area)) ? '' : 'none';
    });
}
