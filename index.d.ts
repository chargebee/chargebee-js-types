/**
 * Type Definitions for Chargebee JS SDK.
 */

import {
  HostedFields,
  Card,
  Events,
  ComponentType,
  PaymentAttemptStatus,
  Gateway,
  PaymentIntentStatus,
  PaymentMethodType,
  Layout,
} from './enums';

declare var Chargebee: {
  init(op: InitOptions): void;
  getInstance(): ChargebeeInstance;
};

type InitOptions = {
  site: string;
  publishableKey: string;
};

type OpenCheckoutOptions = {
  hostedPage: Function;
  layout: Layout;
  loaded: Function;
  error: Function;
  success(hostedPageId: string): void;
  close: Function;
  step(currentStep: string): void;
};

interface AddressDetails {
  first_name: string;
  last_name: string;
  company: string;
  phone: string;
  email: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  state_code: string;
  country: string;
  zip: string;
}

type BillingAddress = AddressDetails;

type ShippingAddress = AddressDetails;

interface CustomerDetails {
  first_name: string;
  last_name: string;
  company: string;
  phone: string;
  email: string;
  billingAddress: BillingAddress;
}

interface AddOn {
  id: string;
  quantity?: number;
  quantity_in_decimal?: string;
}

type EventBasedAddon = {
  id?: string;
  quantity?: number;
  unit_price?: number;
  service_period_in_days?: number;
  on_event?:
    | 'subscription_creation'
    | 'subscription_trial_start'
    | 'plan_activation'
    | 'subscription_activation';
  charge_once?: boolean;
  charge_on?: 'immediately' | 'on_event';
};

interface ChargeItem extends AddOn {}

interface Product {
  setPlanQuantity(planQuantity: number): Product;
  setPlanQuantityInDecimal(decimalQuantity: string): Product;
  incrementPlanQuantity(): Product;
  decrementPlanQuantity(): Product;
  addAddon(addon: AddOn | string): Product;
  removeAddon(addon: AddOn | string): Product;
  setAddons(addons: Array<AddOn>): Product;
  incrementAddonQty(addonId: string): Product;
  decrementAddonQty(addonId: string): Product;
  addCoupon(couponCode: string): Product;
  removeCoupon(couponCode: string): Product;
  setCustomData(
    data: object /** Object containing subs custom fields */
  ): Product;
  getLayout(): Layout;
  setLayout(layout: Layout): void;
  setCharges(charges: Array<ChargeItem>): Product;
  addCharge(chargeItem: ChargeItem): Product;
  removeCharge(chargeItemId: string): Product;
  incrementChargeQty(chargeItemId: string): Product;
  decrementChargeQty(chargeItemId: string): Product;
}

interface Cart {
  replaceProduct(product: Product): Cart;
  proceedToCheckout(): void;
  setBusinessEntity(businessEntityId: string): Promise<void>;
  setAffiliateToken(token: string): Cart;
  setCustomer(customer: Customer): Cart;
  setShippingAddress(shippingAddress: ShippingAddress): Cart;
}

interface PortalOpenOptions {
  loaded: Function;
  close: Function;
  visit(sectionType: string): void;
  paymentSourceAdd: Function;
  paymentSourceUpdate: Function;
  paymentSourceRemove: Function;
  subscriptionChanged(data: { subscription: { id: string } }): void;
  subscriptionCustomFieldsChanged(data: { subscription: { id: string } }): void;
  subscriptionCancelled(data: { subscription: { id: string } }): void;
  subscriptionResumed(data: { subscription: { id: string } }): void;
  subscriptionPaused(data: { subscription: { id: string } }): void;
  scheduledPauseRemoved(data: { subscription: { id: string } }): void;
  scheduledCancellationRemoved(data: { subscription: { id: string } }): void;
  subscriptionReactivated(data: { subscription: { id: string } }): void;
}

interface PortalForwardOptions {
  sectionType: string;
  params: {
    subscriptionId: string;
    paymentSourceId: string;
  };
}

interface PortalOpenSectionOptions {
  sectionType: string;
  params: {
    subscriptionId: string;
  };
}

interface PortalCallbacks extends PortalOpenOptions {}

interface Portal {
  open(options: PortalOpenOptions, forwardOptions: PortalForwardOptions): void;
  openSection(
    options: PortalOpenSectionOptions,
    callbacks: PortalCallbacks
  ): void;
}

interface SetCheckoutCallbacks {
  loaded: Function;
  error: Function;
  success(hostedPageId: string): void;
  close: Function;
  step(currentStep: string): void;
}

interface SetPaymentIntentOptions {
  stripe: object;
  braintree: object;
  adyen: object;
}

type CardInfo = {
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  firstName?: string;
  lastName?: string;
};

type PaymentInfo = {
  element?: any;
  card?: CardInfo;
  tokenizer?: Function;
  cbToken?: string;
  cardComponent?: string;
  additionalData?: AdditionalData;
};

interface ThreeDSHandler {
  setPaymentIntent(
    paymentIntent: PaymentIntent,
    options: SetPaymentIntentOptions
  ): void;
  updatePaymentIntent(paymentIntent: PaymentIntent): void;
  handleCardPayment(
    paymentInfo: PaymentInfo,
    callbacks: Callbacks
  ): Promise<PaymentIntent>;
  getPaymentIntent(): PaymentIntent;
}

type PaymentCallbacks = {
  change: Function;
  success: Function;
  error: Function;
};

type PaymentOptions = {
  paymentIntent: Function;
  paymentInfo: PaymentInfo;
  callbacks: PaymentCallbacks;
  redirectMode: boolean;
};

type Subscription = {
  id?: string;
  plan_id: string;
  plan_quantity?: number;
  plan_unit_price?: number;
  setup_fee?: number;
  start_date?: number;
  trial_end?: number;
};

type CommonSubscriptionEstimate = {
  customer?: Customer;
  subscription?: Subscription;

  billing_cycles?: number;
  terms_to_charge?: number;
  invoice_immediately?: boolean;
  billing_alignment_mode?: 'immediate' | 'delayed';

  shipping_address?: ShippingAddress;
  billing_address?: BillingAddress;

  coupon_ids?: Array<string>;
  addons?: Array<AddOn>;
  event_based_addons?: Array<EventBasedAddon>;
  mandatory_addons_to_remove?: Array<string>;
};

type CreateSubscriptionEstimate = CommonSubscriptionEstimate & {
  client_profile_id?: string;
};

type UpdateSubscriptionEstimate = CommonSubscriptionEstimate & {
  replace_addon_list?: boolean;
  reactivate_from?: number;
  replace_coupon_list?: boolean;
  prorate?: boolean;
  end_of_term?: boolean;
  force_term_reset?: boolean;
  reactivate?: boolean;
  include_delayed_charges?: boolean;
  use_existing_balances?: boolean;
};

type SubscriptionRenewalEstimate = {
  id: string;
  subscription?: {
    id: string;
  };
  include_delayed_charges?: boolean;
  use_existing_balances?: boolean;
  ignore_scheduled_cancellation?: boolean;
  ignore_scheduled_changes?: boolean;
};

interface EstimatesFunctions {
  createSubscriptionEstimate(
    payload: CreateSubscriptionEstimate
  ): Promise<object> /** Resource object representing estimate */;
  updateSubscriptionEstimate(
    payload: UpdateSubscriptionEstimate
  ): Promise<object> /** Resource object representing estimate */;
  renewSubscriptionEstimate(
    payload: SubscriptionRenewalEstimate
  ): Promise<object> /** Resource object representing estimate */;
}

type VatValidationParams = {
  country: string;
  vat_number: string;
};

type VatValidationResponse = {
  status: 'VALID' | 'INVALID' | 'UNDETERMINED';
  message: string;
};

interface VatFunctions {
  validateVat(payload: VatValidationParams): VatValidationResponse;
}

type ChargebeeInstance = {
  site: string;
  publishableKey: string;
  createComponent(
    type: ComponentType,
    options: ComponentOptions
  ): ChargebeeComponent;
  tokenize(component: Component, additionalData: object): void;

  /** Checkout and Portal Integration */
  setBusinessEntity(businessEntityId: string): Promise<void>;
  openCheckout(options: OpenCheckoutOptions): void;
  getCart(): Cart;
  getProduct(checkoutButtonElement: HTMLElement): Product;
  initializeProduct(
    planId: string,
    planQuantity: number
  ): Product;
  setCheckoutCallbacks(
    setterFunction: (cart: Cart) => SetCheckoutCallbacks
  ): void;
  createChargebeePortal(): Portal;
  setPortalSession(setterFunction: Function): Promise<Portal>;
  logout(): void;
  closeAll(): void;
  setPortalCallbacks(callbacks: PortalCallbacks): void;

  /** Payment Integrations */
  load(
    moduleName: string
  ): Promise<any> /** Promise resolves to corresponding module handler */;
  load3DSHandler(): Promise<ThreeDSHandler>;
  create3DSHandler(): ThreeDSHandler;
  handlePayment(
    paymentMethodType: PaymentMethodType,
    paymentOptions: PaymentOptions
  ): Promise<PaymentIntent> /** Promise resolves to authorized payment intent */;

  /** Functions */
  estimates: EstimatesFunctions;
  vat: VatFunctions;
};

type ChargebeeComponent = {
  createField(
    fieldType: Card.ComponentFieldType,
    options: ComponentOptions
  ): ComponentField;
  at(id: string): ChargebeeComponent;
  on(event: Events, callback: Function): ChargebeeComponent;
  mount(): Promise<boolean>;
  destroy(): Promise<void>;
};

type ComponentField = {
  at(id: string): ComponentField;
  applyStyles(options: ComponentOptions): ComponentField;
  focus(): void;
  blur(): void;
  clear(): void;
  on(event: Events, callback: Function): ComponentField;
  // mount(): Promise<boolean>;
};

type ComponentOptions = {
  [HostedFields.Options.classes]?: Classes;
  [HostedFields.Options.style]?: Styles;
  [HostedFields.Options.fonts]?: Fonts;
  [HostedFields.Options.field]?: Fields;
  [HostedFields.Options.locale]?: string;
  [HostedFields.Options.placeholder]?: Placeholder | string;
  [HostedFields.Options.ariaLabel]?: AriaLabel | string;
};

type Classes = {
  [HostedFields.CSSClass.focus]?: string;
  [HostedFields.CSSClass.empty]?: string;
  [HostedFields.CSSClass.invalid]?: string;
  [HostedFields.CSSClass.complete]?: string;
};

type StyleBlock = CSSStyleBlock & PseudoStyleBlock;

type Styles = {
  [HostedFields.StyleSections.base]: StyleBlock;
  [HostedFields.StyleSections.empty]: StyleBlock;
  [HostedFields.StyleSections.invalid]: StyleBlock;
};

type Fonts = Array<FontFace | FontURL>;

type FontFace = {
  fontFamily: string;
  src?: string;
  fontStyle?: string;
  fontWeight?: string;
};

export type FieldConfiguration = {
  [HostedFields.FieldOption.required]?: boolean;
  [HostedFields.FieldOption.show]?: boolean;
};

type Fields = {
  [HostedFields.Field.number]?: FieldConfiguration;
  [HostedFields.Field.expiry]?: FieldConfiguration;
  [HostedFields.Field.cvv]?: FieldConfiguration;
};

type FontURL = string;

type Placeholder = {
  [HostedFields.Placeholder.number]?: string;
  [HostedFields.Placeholder.expiry]?: string;
  [HostedFields.Placeholder.cvv]?: string;
};

type CSSStyleBlock = {
  [HostedFields.CustomCSSProperty.iconColor]?: string;

  [HostedFields.StdCSSProperty.color]?: string;
  [HostedFields.StdCSSProperty.letterSpacing]?: string;

  [HostedFields.StdCSSProperty.textAlign]?: string;
  [HostedFields.StdCSSProperty.textTransform]?: string;
  [HostedFields.StdCSSProperty.textDecoration]?: string;
  [HostedFields.StdCSSProperty.textShadow]?: string;

  [HostedFields.StdCSSProperty.lineHeight]?: string;

  [HostedFields.FontProperty.src]?: string;
  [HostedFields.FontProperty.fontFamily]?: string;
  [HostedFields.FontProperty.fontSize]?: string;
  [HostedFields.FontProperty.fontSmoothing]?: string;
  [HostedFields.FontProperty.fontStyle]?: string;
  [HostedFields.FontProperty.fontWeight]?: string;
  [HostedFields.FontProperty.fontVariant]?: string;
};

type PseudoStyleBlock = {
  [HostedFields.PseudoCSSProperty.hover]?: CSSStyleBlock;
  [HostedFields.PseudoCSSProperty.focus]?: CSSStyleBlock;
  [HostedFields.PseudoCSSProperty.disabled]?: CSSStyleBlock;
  [HostedFields.PseudoCSSProperty.placeholder]?: CSSStyleBlock;
  [HostedFields.PseudoCSSProperty.selection]?: CSSStyleBlock;
  [HostedFields.PseudoCSSProperty.autofill]?: CSSStyleBlock;
  [HostedFields.PseudoCSSProperty.focusPlaceholder]?: CSSStyleBlock;
};

type AriaLabel = {
  [HostedFields.AriaLabel.number]?: string;
  [HostedFields.AriaLabel.expiry]?: string;
  [HostedFields.AriaLabel.cvv]?: string;
};

type PayerInfo = {
  customer?: Customer;
  shipping_address?: Address;
  billing_address?: Address;
};

type PaymentAttempt = {
  id: string;
  status: PaymentAttemptStatus;
  type: string;
  active: boolean;
  id_at_gateway?: string;
  action_payload: any;
  error_code?: string;
  error_text?: string;
  error_msg?: string;
};

export type PaymentIntent = {
  id: string;
  status: PaymentIntentStatus;
  amount: number;
  currency_code: string;
  gateway_account_id: string;
  gateway: Gateway;
  active_payment_attempt?: PaymentAttempt;
  customer_id?: string;
  reference_id?: string;
  payment_method_type: PaymentMethodType;
  success_url?: string;
  business_entity_id?: string;
  payer_info?: PayerInfo;
};

export type AdditionalData = {
  cardBillingAddress?: Address; //  | -- Duplicate parameters
  billingAddress?: Address; //  |
  customerBillingAddress?: Address;
  shippingAddress?: Address;
  customer?: Customer;
  email?: string;
  phone?: string;
  plan?: string;

  // Adyen
  encryptedCardDetails?: string;

  // CBToken - Id at vault parameter
  vaultId?: string;

  //Options
  locale?: string;

  // RBI Mandate
  mandate?: Mandate;
};

type Mandate = {
  requireMandate: boolean;
  description?: string;
};

type Customer = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

type Address = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  city?: string;
  state?: string;
  stateCode?: string;
  countryCode?: string;
  zip?: string | number;
};

export type Callbacks = {
  success?: Function;
  error?: Function;
  change?: Function;
  cancel?: Function;
};

export interface Component {
  name: string;
  type: ComponentType;
  status: Number;
  focus: Function;
  clear: Function;
  blur: Function;
  update: Function;
  createField: Function;
  mount(id?: string): Promise<boolean>;
  framesCreated(): string[];
  delegateEvent(event: CustomEvent): void;
  tokenize(data?: AdditionalData): Promise<object>;
  authorizeWith3ds(
    paymentIntent: PaymentIntent,
    additionalData: AdditionalData,
    callbacks: Callbacks
  ): Promise<PaymentIntent>;
}
