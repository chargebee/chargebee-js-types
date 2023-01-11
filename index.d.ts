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
} from './enums';

declare var Chargebee: {
  init(op: InitOptions): void;
  getInstance(): ChargebeeInstance;
};

type InitOptions = {
  site: string;
  publishableKey: string;
};

type ChargebeeInstance = {
  site: string;
  publishableKey: string;
  createComponent(
    type: ComponentType,
    options: ComponentOptions
  ): ChargebeeComponent;
  tokenize(component: Component, additionalData: object): void;
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
  tokenize(data?: AdditionalData): any;
  authorizeWith3ds(
    paymentIntent: PaymentIntent,
    additionalData: AdditionalData,
    callbacks: Callbacks
  ): Promise<PaymentIntent>;
}
