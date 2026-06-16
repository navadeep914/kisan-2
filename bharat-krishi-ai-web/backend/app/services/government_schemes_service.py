class GovernmentSchemesService:
    def predict(self, state: str, land_size: float, crop: str, farmer_category: str = "General"):
        # List of all schemes in the database
        all_schemes = [
            {
                "name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
                "amount": "₹6,000/year",
                "desc": "Direct income support of ₹6,000 per year in three equal installments to farmer families with cultivable landholding.",
                "eligibility_fn": lambda s, l, c: l <= 5.0, # Less than 5 acres for small-scale focus
                "steps": ["Register on Portal", "eKYC Verification", "Aadhar Link check", "Direct Benefit Transfer"],
                "category": "Credit"
            },
            {
                "name": "Rythu Bandhu Scheme",
                "amount": "₹10,000/acre/year",
                "desc": "Telangana state investment support scheme for agriculture and horticulture crops. Distributed in Kharif and Rabi seasons.",
                "eligibility_fn": lambda s, l, c: s.lower() == "telangana",
                "steps": ["Apply to Agricultural Officer", "Land Deed Verification", "Rythu Bandhu Card Issuance", "Bank Account Disbursal"],
                "category": "Subsidy"
            },
            {
                "name": "YSR Rythu Bharosa",
                "amount": "₹13,500/year",
                "desc": "Andhra Pradesh government scheme providing financial assistance to land-owning and tenant farmers.",
                "eligibility_fn": lambda s, l, c: s.lower() == "andhra pradesh",
                "steps": ["Tenant/Owner Listing", "Social Audit Review", "Eligibility Approval", "Bi-annual Disbursal"],
                "category": "Subsidy"
            },
            {
                "name": "PM Fasal Bima Yojana (PMFBY)",
                "amount": "Crop Insurance Cover",
                "desc": "Comprehensive risk insurance against crop failure due to drought, pests, and natural calamities with very low premiums.",
                "eligibility_fn": lambda s, l, c: c.lower() in ["rice", "wheat", "maize", "cotton", "sugarcane"],
                "steps": ["Enroll via Bank/Agent", "Pay 1.5%-2% Premium", "Crop Health Monitoring", "Claim Settlement on Loss"],
                "category": "Insurance"
            },
            {
                "name": "Kisan Credit Card (KCC) Scheme",
                "amount": "Credit up to ₹3 Lakhs",
                "desc": "Provides farmers with timely short-term credit for cultivation, crop production, and post-harvest maintenance at 4% interest rate.",
                "eligibility_fn": lambda s, l, c: True, # Eligible for all active farmers
                "steps": ["Apply at local bank", "Land documents check", "Credit limit approval", "KCC Card dispatch"],
                "category": "Credit"
            },
            {
                "name": "Soil Health Card Scheme",
                "amount": "Free Soil Testing & Report",
                "desc": "Assists state governments in issuing soil health cards to all farmers to promote balanced fertilizer application based on soil nutrient status.",
                "eligibility_fn": lambda s, l, c: True,
                "steps": ["Soil Sample Collection", "Testing at Government Lab", "Card Issuance", "Fertilizer dosage guide"],
                "category": "Subsidy"
            }
        ]

        eligible_schemes = []
        for s in all_schemes:
            is_eligible = s["eligibility_fn"](state, land_size, crop)
            eligible_schemes.append({
                "name": s["name"],
                "amount": s["amount"],
                "desc": s["desc"],
                "eligible": is_eligible,
                "steps": s["steps"],
                "category": s["category"]
            })

        return {
            "state": state,
            "land_size": land_size,
            "crop": crop,
            "schemes": eligible_schemes
        }
