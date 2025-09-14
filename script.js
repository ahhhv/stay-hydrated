class WaterTracker {
    constructor() {
        this.currentAmount = 0;
        this.dailyGoal = 2000;
        this.entries = [];
        this.achievementShown = {};
        this.currentLanguage = 'en';
        this.currentUnits = 'ml';
        this.currentTheme = 'light';
        this.quickItems = [
            { amount: 250, icon: 'fas fa-mug-hot', label: '250ml' },
            { amount: 500, icon: 'fas fa-coffee', label: '500ml' },
            { amount: 750, icon: 'fas fa-wine-glass', label: '750ml' },
            { amount: 1000, icon: 'fas fa-wine-bottle', label: '1L' }
        ];
        
        this.translations = {
            en: {
                app_title: 'Stay hydrated!',
                goal: 'Goal:',
                ml: 'ml',
                ounces: 'oz',
                add_water: 'Add',
                clear_log: 'Clear Today\'s Log',
                todays_log: 'Today\'s Log',
                settings: 'Settings',
                language: 'Language:',
                units: 'Units:',
                theme: 'Theme:',
                english: 'English',
                spanish: 'Español',
                catalan: 'Català',
                daily_goal_label: 'Daily Goal:',
                edit_quick_items: 'Edit Quick Items',
                add_item: 'Add Item',
                reset_to_default: 'Reset to Default',
                save_changes: 'Save Changes',
                clear_confirm: 'Are you sure you want to clear today\'s log?',
                achievement_quarter: '🎉 25% of your daily goal reached!',
                achievement_half: '🎉 50% of your daily goal reached!',
                achievement_three_quarters: '🎉 75% of your daily goal reached!',
                achievement_goal: '🎉 Congratulations! You\'ve reached your daily goal!',
                achievement_exceeded: '🎉 Amazing! You\'ve exceeded your daily goal!',
                light_theme: 'Light',
                dark_theme: 'Dark',
                ocean_theme: 'Ocean',
                forest_theme: 'Forest',
                sunset_theme: 'Sunset',
                purple_theme: 'Purple',
                change_icon: 'Change',
                select_icon: 'Select Icon'
            },
            es: {
                app_title: 'Stay hydrated!',
                goal: 'Meta:',
                ml: 'ml',
                ounces: 'oz',
                add_water: 'Agregar',
                clear_log: 'Limpiar Registro de Hoy',
                todays_log: 'Registro de Hoy',
                settings: 'Configuración',
                language: 'Idioma:',
                units: 'Unidades:',
                theme: 'Tema:',
                english: 'Inglés',
                spanish: 'Español',
                catalan: 'Catalán',
                daily_goal_label: 'Meta Diaria:',
                edit_quick_items: 'Editar Elementos Rápidos',
                add_item: 'Agregar Elemento',
                reset_to_default: 'Restablecer por Defecto',
                save_changes: 'Guardar Cambios',
                clear_confirm: '¿Estás seguro de que quieres limpiar el registro de hoy?',
                achievement_quarter: '🎉 ¡Has alcanzado el 25% de tu meta diaria!',
                achievement_half: '🎉 ¡Has alcanzado el 50% de tu meta diaria!',
                achievement_three_quarters: '🎉 ¡Has alcanzado el 75% de tu meta diaria!',
                achievement_goal: '🎉 ¡Felicidades! ¡Has alcanzado tu meta diaria!',
                achievement_exceeded: '🎉 ¡Increíble! ¡Has superado tu meta diaria!',
                light_theme: 'Claro',
                dark_theme: 'Oscuro',
                ocean_theme: 'Océano',
                forest_theme: 'Bosque',
                sunset_theme: 'Atardecer',
                purple_theme: 'Morado',
                change_icon: 'Cambiar',
                select_icon: 'Seleccionar Icono'
            },
            ca: {
                app_title: 'Stay hydrated!',
                goal: 'Objectiu:',
                ml: 'ml',
                ounces: 'oz',
                add_water: 'Afegir',
                clear_log: 'Netejar Registre d\'Avui',
                todays_log: 'Registre d\'Avui',
                settings: 'Configuració',
                language: 'Idioma:',
                units: 'Unitats:',
                theme: 'Tema:',
                english: 'Anglès',
                spanish: 'Espanyol',
                catalan: 'Català',
                daily_goal_label: 'Objectiu Diari:',
                edit_quick_items: 'Editar Elements Ràpids',
                add_item: 'Afegir Element',
                reset_to_default: 'Restablir per Defecte',
                save_changes: 'Guardar Canvis',
                clear_confirm: 'Estàs segur que vols netejar el registre d\'avui?',
                achievement_quarter: '🎉 Has assolit el 25% del teu objectiu diari!',
                achievement_half: '🎉 Has assolit el 50% del teu objectiu diari!',
                achievement_three_quarters: '🎉 Has assolit el 75% del teu objectiu diari!',
                achievement_goal: '🎉 Felicitats! Has assolit el teu objectiu diari!',
                achievement_exceeded: '🎉 Increïble! Has superat el teu objectiu diari!',
                light_theme: 'Clar',
                dark_theme: 'Fosc',
                ocean_theme: 'Oceà',
                forest_theme: 'Bosc',
                sunset_theme: 'Posta de Sol',
                purple_theme: 'Morat',
                change_icon: 'Canviar',
                select_icon: 'Seleccionar Icona'
            }
        };
    }

    init() {
        this.loadFromStorage();
        this.checkNewDay();
        this.initSettings();
        this.initTheme();
        this.bindEvents();
        this.updateDisplay();
        this.updateProgress();
        this.updateLog();
        this.updateLanguage();
        this.updateQuickButtons();
    }

    bindEvents() {
        // Quick add buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const amount = parseInt(btn.dataset.amount);
                this.addWater(amount);
            });
        });

        // Custom add button
        document.getElementById('add-custom').addEventListener('click', () => {
            const amount = parseInt(document.getElementById('custom-amount').value);
            if (amount && amount > 0) {
                this.addWater(amount);
                document.getElementById('custom-amount').value = '';
            }
        });

        // Enter key for custom amount
        document.getElementById('custom-amount').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('add-custom').click();
            }
        });

        // Clear log button
        document.getElementById('clear-log').addEventListener('click', () => {
            if (confirm(this.translations[this.currentLanguage].clear_confirm)) {
                this.clearLog();
            }
        });

        // Theme toggle button removed - now only available in settings

        // Settings modal
        document.getElementById('settings-btn').addEventListener('click', () => {
            this.openSettings();
        });

        document.getElementById('close-settings').addEventListener('click', () => {
            this.closeSettings();
        });

        // Settings event listeners
        document.getElementById('language-select').addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });

        document.getElementById('units-select').addEventListener('change', (e) => {
            this.changeUnits(e.target.value);
        });

        document.getElementById('theme-select').addEventListener('change', (e) => {
            this.changeTheme(e.target.value);
        });

        // Daily goal input
        document.getElementById('daily-goal-input').addEventListener('change', (e) => {
            const goal = parseInt(e.target.value);
            if (goal && goal > 0) {
                this.setDailyGoal(goal);
            }
        });

        // Quick items editor
        document.getElementById('edit-quick-items').addEventListener('click', () => {
            this.openQuickItemsEditor();
        });

        document.getElementById('close-quick-items').addEventListener('click', () => {
            this.closeQuickItemsEditor();
        });

        document.getElementById('add-quick-item').addEventListener('click', () => {
            this.addQuickItem();
        });

        document.getElementById('reset-quick-items').addEventListener('click', () => {
            this.resetQuickItems();
        });

        document.getElementById('save-quick-items').addEventListener('click', () => {
            this.saveQuickItems();
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    addWater(amount) {
        const convertedAmount = this.currentUnits === 'oz' ? Math.round(amount * 29.5735) : amount;
        
        this.currentAmount += convertedAmount;
        this.entries.push({
            id: Date.now(),
            amount: convertedAmount,
            time: new Date().toLocaleTimeString(),
            originalAmount: amount,
            units: this.currentUnits
        });
        
        this.saveToStorage();
        this.updateDisplay();
        this.updateProgress();
        this.updateLog();
        this.checkAchievements();
        this.animateAdd(amount);
        
        this.showNotification(`+${amount}${this.currentUnits === 'ml' ? 'ml' : 'oz'} added!`, 'success');
    }

    removeWater(entryId) {
        const entry = this.entries.find(e => e.id === entryId);
        if (entry) {
            this.currentAmount -= entry.amount;
            this.entries = this.entries.filter(e => e.id !== entryId);
            this.saveToStorage();
            this.updateDisplay();
            this.updateProgress();
            this.updateLog();
        }
    }

    setDailyGoal(goal) {
        this.dailyGoal = goal;
        this.saveToStorage();
        this.updateDisplay();
        this.updateProgress();
    }

    clearLog() {
        this.currentAmount = 0;
        this.entries = [];
        this.achievementShown = {}; // Reset achievements when clearing log
        this.saveToStorage();
        this.updateDisplay();
        this.updateProgress();
        this.updateLog();
    }

    updateDisplay() {
        const displayAmount = this.currentUnits === 'oz' ? 
            Math.round(this.currentAmount / 29.5735) : this.currentAmount;
        const displayGoal = this.currentUnits === 'oz' ? 
            Math.round(this.dailyGoal / 29.5735) : this.dailyGoal;
            
        document.getElementById('current-amount').textContent = displayAmount;
        document.getElementById('daily-goal').textContent = displayGoal;
        
        // Update daily goal input
        const goalInput = document.getElementById('daily-goal-input');
        if (goalInput) {
            goalInput.value = displayGoal;
        }
    }

    updateLog() {
        const logContainer = document.getElementById('log-entries');
        logContainer.innerHTML = '';
        
        this.entries.slice().reverse().forEach(entry => {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            
            const displayAmount = this.currentUnits === 'oz' ? 
                Math.round(entry.amount / 29.5735) : entry.amount;
            const unit = this.currentUnits === 'oz' ? 'oz' : 'ml';
            
            logEntry.innerHTML = `
                <span class="log-time">${entry.time}</span>
                <span class="log-amount">${displayAmount}${unit}</span>
                <button class="remove-entry" onclick="waterTracker.removeWater(${entry.id})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            logContainer.appendChild(logEntry);
        });
    }

    checkAchievements() {
        // Achievement notifications disabled per user request
        // Progress tracking continues without visual notifications
    }

    showAchievement(message) {
        const achievement = document.getElementById('achievement');
        const achievementText = document.getElementById('achievement-text');
        
        achievementText.textContent = message;
        achievement.classList.remove('hidden');
        
        setTimeout(() => {
            this.hideAchievement();
        }, 4000);
    }

    hideAchievement() {
        document.getElementById('achievement').classList.add('hidden');
    }

    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');
        
        // Remove existing type classes
        notification.classList.remove('error', 'success', 'warning', 'info');
        notification.classList.add(type);
        
        notificationText.textContent = message;
        notification.classList.remove('hidden');
        
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    animateAdd(amount) {
        const currentAmountEl = document.getElementById('current-amount');
        currentAmountEl.style.transform = 'scale(1.1)';
        currentAmountEl.style.color = 'var(--secondary-color)';
        
        setTimeout(() => {
            currentAmountEl.style.transform = 'scale(1)';
            currentAmountEl.style.color = 'var(--primary-color)';
        }, 300);
    }

    saveToStorage() {
        const data = {
            currentAmount: this.currentAmount,
            dailyGoal: this.dailyGoal,
            entries: this.entries,
            date: new Date().toDateString(),
            achievementShown: this.achievementShown || {},
            quickItems: this.quickItems
        };
        
        localStorage.setItem('waterTrackerData', JSON.stringify(data));
        localStorage.setItem('waterTracker_language', this.currentLanguage);
        localStorage.setItem('waterTracker_units', this.currentUnits);
        localStorage.setItem('waterTrackerTheme', this.currentTheme);
    }

    loadFromStorage() {
        const data = localStorage.getItem('waterTrackerData');
        if (data) {
            try {
                const parsed = JSON.parse(data);
                
                // Check if data is from today
                if (parsed.date === new Date().toDateString()) {
                    this.currentAmount = parsed.currentAmount || 0;
                    this.entries = parsed.entries || [];
                    this.achievementShown = parsed.achievementShown || {};
                }
                
                this.dailyGoal = parsed.dailyGoal || 2000;
                if (parsed.quickItems) {
                    this.quickItems = parsed.quickItems;
                }
            } catch (e) {
                console.error('Error loading data from storage:', e);
            }
        }
        
        // Load settings
        this.currentLanguage = localStorage.getItem('waterTracker_language') || 'en';
        this.currentUnits = localStorage.getItem('waterTracker_units') || 'ml';
        this.currentTheme = localStorage.getItem('waterTrackerTheme') || 'light';
    }

    checkNewDay() {
        const lastDate = localStorage.getItem('waterTrackerLastDate');
        const today = new Date().toDateString();
        
        if (lastDate !== today) {
            // New day - reset daily data but keep settings
            this.currentAmount = 0;
            this.entries = [];
            this.achievementShown = {};
            localStorage.setItem('waterTrackerLastDate', today);
        }
    }

    initTheme() {
        this.setTheme(this.currentTheme);
    }

    toggleTheme() {
        this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light');
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('waterTrackerTheme', theme);
    }

    // Settings Management
    initSettings() {
        const savedLanguage = localStorage.getItem('waterTracker_language') || 'en';
        const savedUnits = localStorage.getItem('waterTracker_units') || 'ml';
        const savedTheme = localStorage.getItem('waterTrackerTheme') || 'light';
        
        this.currentLanguage = savedLanguage;
        this.currentUnits = savedUnits;
        this.currentTheme = savedTheme;
        
        // Set select values
        document.getElementById('language-select').value = savedLanguage;
        document.getElementById('units-select').value = savedUnits;
        document.getElementById('theme-select').value = savedTheme;
    }

    openSettings() {
        document.getElementById('settings-modal').style.display = 'block';
    }

    closeSettings() {
        document.getElementById('settings-modal').style.display = 'none';
    }

    changeLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('waterTracker_language', language);
        this.updateLanguage();
    }

    changeUnits(units) {
        localStorage.setItem('waterTracker_units', units);
        this.convertExistingData(units);
        this.updateLanguage();
        this.updateDisplay();
        this.updateProgress();
    }

    changeTheme(theme) {
        this.setTheme(theme);
    }

    updateProgress() {
        const percentage = Math.min((this.currentAmount / this.dailyGoal) * 100, 100);
        document.getElementById('progress-fill').style.width = `${percentage}%`;
        document.getElementById('progress-percentage').textContent = `${Math.round(percentage)}%`;
    }

    updateLanguage() {
        const translations = this.translations[this.currentLanguage];
        
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translations[key];
                } else {
                    element.textContent = translations[key];
                }
            }
        });
        
        this.updateUnitLabels();
        this.updateLog();
    }

    updateUnitLabels() {
        const unitElements = document.querySelectorAll('.unit');
        const unitText = this.currentUnits === 'ml' ? 'ml' : 'oz';
        
        unitElements.forEach(element => {
            if (element.getAttribute('data-translate') === 'ml' || 
                element.getAttribute('data-translate') === 'ounces') {
                element.textContent = unitText;
            }
        });
        
        // Update quick button labels
        this.updateQuickButtons();
    }

    convertExistingData(newUnits) {
        if (this.currentUnits !== newUnits) {
            if (newUnits === 'oz') {
                // Convert from ml to oz
                this.currentAmount = Math.round(this.currentAmount / 29.5735);
                this.dailyGoal = Math.round(this.dailyGoal / 29.5735);
                this.entries.forEach(entry => {
                    entry.amount = Math.round(entry.amount / 29.5735);
                });
            } else {
                // Convert from oz to ml
                this.currentAmount = Math.round(this.currentAmount * 29.5735);
                this.dailyGoal = Math.round(this.dailyGoal * 29.5735);
                this.entries.forEach(entry => {
                    entry.amount = Math.round(entry.amount * 29.5735);
                });
            }
            
            this.currentUnits = newUnits;
            this.saveToStorage();
        }
    }

    getStats() {
        return {
            currentAmount: this.currentAmount,
            dailyGoal: this.dailyGoal,
            percentage: (this.currentAmount / this.dailyGoal) * 100,
            entriesCount: this.entries.length,
            averagePerEntry: this.entries.length > 0 ? this.currentAmount / this.entries.length : 0
        };
    }

    openQuickItemsEditor() {
        document.getElementById('quick-items-modal').style.display = 'block';
        this.renderQuickItemsEditor();
    }

    closeQuickItemsEditor() {
        document.getElementById('quick-items-modal').style.display = 'none';
    }

    renderQuickItemsEditor() {
        const container = document.getElementById('quick-items-editor');
        container.innerHTML = '';
        
        this.quickItems.forEach((item, index) => {
            const editor = document.createElement('div');
            editor.className = 'quick-item-editor';
            
            // Create amount input
            const amountInput = document.createElement('input');
            amountInput.type = 'number';
            amountInput.value = item.amount;
            amountInput.placeholder = 'Amount';
            amountInput.min = '1';
            amountInput.max = '5000';
            amountInput.addEventListener('change', (e) => {
                this.quickItems[index].amount = parseInt(e.target.value) || 250;
                this.quickItems[index].label = this.formatAmount(this.quickItems[index].amount);
                // Update only the label input for this item
                labelInput.value = this.quickItems[index].label;
            });
            
            // Create icon selector
            const iconContainer = document.createElement('div');
            iconContainer.className = 'icon-selector-container';
            
            const iconDisplay = document.createElement('div');
            iconDisplay.className = 'icon-display';
            iconDisplay.innerHTML = `<i class="${item.icon}"></i>`;
            
            const iconButton = document.createElement('button');
            iconButton.type = 'button';
            iconButton.className = 'icon-select-btn';
            iconButton.innerHTML = `<i class="fas fa-edit"></i> ${this.translations[this.currentLanguage].change_icon}`;
            iconButton.addEventListener('click', () => {
                this.openIconSelector(index, iconDisplay);
            });
            
            iconContainer.appendChild(iconDisplay);
            iconContainer.appendChild(iconButton);
            
            // Create label input
            const labelInput = document.createElement('input');
            labelInput.type = 'text';
            labelInput.value = item.label;
            labelInput.placeholder = 'Label';
            labelInput.addEventListener('change', (e) => {
                this.quickItems[index].label = e.target.value || this.formatAmount(item.amount);
            });
            
            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.addEventListener('click', () => this.removeQuickItem(index));
            
            editor.appendChild(amountInput);
            editor.appendChild(iconContainer);
            editor.appendChild(labelInput);
            editor.appendChild(deleteBtn);
            container.appendChild(editor);
        });
    }
    
    formatAmount(amount) {
        if (this.units === 'oz') {
            const oz = Math.round(amount * 0.033814);
            return `${oz}oz`;
        }
        return amount >= 1000 ? `${amount/1000}L` : `${amount}ml`;
    }

    addQuickItem() {
        this.quickItems.push({
            amount: 250,
            icon: 'fas fa-glass-water',
            label: '250ml'
        });
        this.renderQuickItemsEditor();
    }

    removeQuickItem(index) {
        this.quickItems.splice(index, 1);
        this.renderQuickItemsEditor();
    }

    resetQuickItems() {
        this.quickItems = [
            { amount: 250, icon: 'fas fa-mug-hot', label: '250ml' },
            { amount: 500, icon: 'fas fa-wine-glass', label: '500ml' },
            { amount: 750, icon: 'fas fa-wine-bottle', label: '750ml' },
            { amount: 1000, icon: 'fas fa-cocktail', label: '1L' }
        ];
        this.renderQuickItemsEditor();
        this.updateQuickButtons();
    }

    saveQuickItems() {
        this.saveToStorage();
        this.updateQuickButtons();
        this.closeQuickItemsEditor();
    }

    openIconSelector(itemIndex, iconDisplay) {
        // Create icon selector modal
        const modal = document.createElement('div');
        modal.className = 'modal icon-selector-modal';
        modal.style.display = 'block';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        modalHeader.innerHTML = `
            <h3>${this.translations[this.currentLanguage].select_icon}</h3>
            <button class="close-btn" onclick="this.closest('.modal').remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        
        const iconGrid = document.createElement('div');
        iconGrid.className = 'icon-grid';
        
        // Iconos de botellas, tazas y vasos únicamente
        const availableIcons = [
            'fas fa-coffee', 'fas fa-mug-hot', 'fas fa-beer', 'fas fa-wine-glass',
            'fas fa-cocktail', 'fas fa-wine-bottle'
        ];
        
        availableIcons.forEach(iconClass => {
            const iconOption = document.createElement('div');
            iconOption.className = 'icon-option';
            iconOption.innerHTML = `<i class="${iconClass}"></i>`;
            iconOption.addEventListener('click', () => {
                this.quickItems[itemIndex].icon = iconClass;
                iconDisplay.innerHTML = `<i class="${iconClass}"></i>`;
                modal.remove();
            });
            iconGrid.appendChild(iconOption);
        });
        
        modalBody.appendChild(iconGrid);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    updateQuickButtons() {
        const container = document.querySelector('.quick-add-buttons');
        container.innerHTML = '';
        
        this.quickItems.forEach(item => {
            const button = document.createElement('button');
            button.className = 'quick-btn';
            button.dataset.amount = item.amount;
            
            const displayAmount = this.currentUnits === 'oz' ? 
                Math.round(item.amount * 0.033814) : item.amount;
            const unit = this.currentUnits === 'oz' ? 'oz' : 'ml';
            
            button.innerHTML = `
                <i class="${item.icon}"></i>
                <span>${displayAmount}${unit}</span>
            `;
            
            button.addEventListener('click', () => {
                this.addWater(item.amount);
            });
            
            container.appendChild(button);
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the app
const waterTracker = new WaterTracker();
waterTracker.init();

// Debug helpers
console.log('💧 Water Tracker App Loaded!');
console.log('Use waterTracker.getStats() to see current statistics');

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be added here if needed
    });
}