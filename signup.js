document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- FORM ELEMENTS ----------
    const signupForm = document.getElementById('signupForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    
    // Password toggle elements
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    // Password strength elements
    const strengthBars = document.querySelectorAll('.strength-bar');
    
    // ---------- PASSWORD VISIBILITY TOGGLE ----------
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // ---------- PASSWORD STRENGTH CHECKER ----------
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            checkPasswordStrength(password);
        });
    }
    
    function checkPasswordStrength(password) {
        // Reset bars
        strengthBars.forEach(bar => {
            bar.className = 'strength-bar';
        });
        
        if (password.length === 0) {
            return;
        }
        
        // Check strength criteria
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;
        
        const criteria = [hasLowerCase || hasUpperCase, hasNumbers, hasSpecial, isLongEnough];
        const strength = criteria.filter(Boolean).length;
        
        // Update bars based on strength
        if (strength <= 2) {
            strengthBars[0].classList.add('weak');
            if (strength >= 1) strengthBars[1].classList.add('weak');
        } else if (strength === 3) {
            strengthBars[0].classList.add('medium');
            strengthBars[1].classList.add('medium');
            strengthBars[2].classList.add('medium');
        } else if (strength >= 4) {
            strengthBars.forEach(bar => bar.classList.add('strong'));
        }
    }
    
    // ---------- FORM VALIDATION ----------
    function validateForm() {
        let isValid = true;
        
        // Remove existing error messages
        document.querySelectorAll('.error-message').forEach(msg => msg.remove());
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));
        
        // Validate full name
        if (!fullNameInput.value.trim()) {
            showError(fullNameInput, 'Full name is required');
            isValid = false;
        } else if (fullNameInput.value.trim().length < 2) {
            showError(fullNameInput, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        const password = passwordInput.value;
        if (!password) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (password.length < 8) {
            showError(passwordInput, 'Password must be at least 8 characters');
            isValid = false;
        } else if (!/(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
            showError(passwordInput, 'Password must contain at least one number and one special character');
            isValid = false;
        }
        
        // Validate confirm password
        if (!confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Please confirm your password');
            isValid = false;
        } else if (confirmPasswordInput.value !== password) {
            showError(confirmPasswordInput, 'Passwords do not match');
            isValid = false;
        }
        
        // Validate terms
        if (!termsCheckbox.checked) {
            showError(termsCheckbox, 'You must agree to the terms and conditions');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.style.color = '#ff4757';
        error.style.fontSize = '0.8rem';
        error.style.marginTop = '4px';
        
        formGroup.appendChild(error);
        
        // Shake animation
        formGroup.style.animation = 'shake 0.3s ease';
        setTimeout(() => {
            formGroup.style.animation = '';
        }, 300);
    }
    
    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // ---------- FORM SUBMISSION ----------
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Show loading state
                const submitBtn = this.querySelector('.signup-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Creating account...';
                submitBtn.classList.add('loading');
                
                // Simulate API call
                setTimeout(() => {
                    // Remove loading state
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove('loading');
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        Account created successfully! Check your email to verify.
                    `;
                    
                    signupForm.insertAdjacentElement('beforebegin', successMessage);
                    
                    // Reset form
                    signupForm.reset();
                    strengthBars.forEach(bar => bar.className = 'strength-bar');
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                    
                    console.log('Form submitted with:', {
                        name: fullNameInput.value,
                        email: emailInput.value
                    });
                }, 2000);
            }
        });
    }
    
    // ---------- REAL-TIME VALIDATION ----------
    // Email validation on blur
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                showError(this, 'Please enter a valid email address');
            }
        });
    }
    
    // Password match on confirm password input
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value && passwordInput.value && this.value !== passwordInput.value) {
                showError(this, 'Passwords do not match');
            } else {
                const formGroup = this.closest('.form-group');
                formGroup.classList.remove('error');
                const errorMsg = formGroup.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            }
        });
    }
    
    // ---------- SOCIAL BUTTONS ----------
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Connecting...`;
            this.disabled = true;
            
            // Simulate OAuth
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show message
                const message = document.createElement('div');
                message.style.cssText = `
                    background: #667eea;
                    color: white;
                    padding: 10px;
                    border-radius: 8px;
                    text-align: center;
                    font-size: 0.9rem;
                    margin-top: 10px;
                    animation: slideUp 0.3s ease;
                `;
                message.textContent = `${provider} sign-up is for demonstration purposes only`;
                
                this.parentElement.appendChild(message);
                
                setTimeout(() => message.remove(), 3000);
            }, 1500);
        });
    });
    
    // ---------- INPUT FOCUS EFFECTS ----------
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.form-group').querySelector('label i').style.color = '#764ba2';
        });
        
        input.addEventListener('blur', function() {
            this.closest('.form-group').querySelector('label i').style.color = '#667eea';
        });
    });
    
    console.log('Sign-up form initialized ✨');
});