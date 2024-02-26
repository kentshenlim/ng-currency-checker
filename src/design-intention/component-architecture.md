1. `currency-selector`

   - Will be used by more than one feature: "Convert" and "Trend", so must not
     be dependent on service specific to each feature.
   - When change, emit event listened by its parent; it is the parent that
     should depend on feature-specific service.
   - Change → emit event → listened by parent → parent contact service → service
     updates value → parent updates value → itself updates value
   - Source of truth remains single in service

2. `converter-form-panel`

   - Will render `currency-selector` as child.
   - Will depend on `converter.service`.
   - For currency selected, listen for `currency-selector` event, then ask
     `converter.service` to update currency selected accordingly.
   - For amount, ask `converter.service` to update amount accordingly.
   - Both currency and amount should be kept in `currency-selector` as single
     source of truth. This means the component must fetch the two values from
     the service at `ngOnInit`.

3. `converter-form`

   - Will render two instances of `converter-form-panel`, one for base currency
     and amount, the other for target currency and amount.
   - Will fetch conversion rate from `converter.service` to be display.
   - Allows swapping of base and target currency. This will ask
     `converter.service` to update.

4. `chart`

5. `history`
   - Base currency, target currency, monthly or yearly, history points are all
     fetched from `history.service` containing single source of truth.
   - Base currency and target currency updated through rendered
     `currency-selector`; need to listen to event of these.
   - When update is clicked, the service will update; the component will fetch
     latest data from the service, updating all of base currency, target
     currency, month or yearly, and history points.
   - Render `chart` by passing history points as input.
