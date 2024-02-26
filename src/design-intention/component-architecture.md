1. `currency-selector`
   - Will be used by more than one feature: "Convert" and "Trend", so must not
     be dependent on service specific to each feature.
   - When change, emit event listened by its parent; it is the parent that
     should depend on feature-specific service.
   - Change → emit event → listened by parent → parent contact service → service
     updates value → parent updates value → itself updates value
   - Source of truth remains single in service
