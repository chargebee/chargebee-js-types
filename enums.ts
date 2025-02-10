export namespace HostedFields {
  // External field state classes - provided by user
  export enum CSSClass {
    focus = 'focus',
    empty = 'empty',
    invalid = 'invalid',
    complete = 'complete',
  }

  export enum InternalCSSClass {
    focus = 'is-focused',
    empty = 'is-empty',
    invalid = 'is-invalid',
    complete = 'is-complete',
    valid = 'is-valid',
  }

  // Top level options
  export enum Options {
    currency = 'currency',
    classes = 'classes',
    style = 'style',
    fonts = 'fonts',
    locale = 'locale',
    placeholder = 'placeholder',
    field = 'field',
    icon = 'icon',
    ariaLabel = 'ariaLabel',
  }

  export enum StyleSections {
    base = 'base',
    invalid = 'invalid',
    empty = 'empty',
  }

  export enum CustomCSSProperty {
    iconColor = 'iconColor',
  }

  export enum StdCSSProperty {
    color = 'color',
    background = 'background',
    backgroundColor = 'backgroundColor',
    letterSpacing = 'letterSpacing',

    textAlign = 'textAlign',
    textTransform = 'textTransform',
    textDecoration = 'textDecoration',
    textShadow = 'textShadow',

    lineHeight = 'lineHeight',

    webkitTextColor = 'webkitTextColor',
  }

  export enum FontProperty {
    src = 'src',
    fontFamily = 'fontFamily',
    fontSize = 'fontSize',
    fontSmoothing = 'fontSmoothing',
    fontStyle = 'fontStyle',
    fontWeight = 'fontWeight',
    fontVariant = 'fontVariant',
  }

  export enum PseudoCSSProperty {
    hover = ':hover',
    focus = ':focus',
    disabled = ':disabled',
    placeholder = '::placeholder',
    selection = '::selection',
    autofill = ':-webkit-autofill',
    focusPlaceholder = ':focus::placeholder',
  }

  export enum Placeholder {
    number = 'number',
    expiry = 'expiry',
    cvv = 'cvv',
  }

  export enum FieldOption {
    required = 'required',
    show = 'show',
  }

  export enum Field {
    number = 'number',
    expiry = 'expiry',
    cvv = 'cvv',
  }

  export enum AriaLabel {
    number = 'number',
    expiry = 'expiry',
    cvv = 'cvv',
  }
}

export namespace Card {
  export enum ComponentFieldType {
    Combined = 'combined',
    Number = 'number',
    CVV = 'cvv',
    Expiry = 'expiry',
  }
}

export enum Events {
  blur = 'blur',
  focus = 'focus',
  error = 'error',
  change = 'change',
  ready = 'ready',
  setTranslations = 'setTranslations',
}

export enum ComponentType {
  Card = 'card',
  Bank = 'bank_account',
  IDeal = 'ideal',
  Dotpay = 'dotpay',
  Paypal = 'paypal',
  Netbanking = 'netbanking',
  Applepay = 'applepay',
}

export enum PaymentIntentStatus {
  INITED = 'inited',
  IN_PROGRESS = 'in_progress',
  AUTHORIZED = 'authorized',
  CONSUMED = 'consumed',
}

export enum PaymentMethodType {
  CARD = 'card',
  IDEAL = 'ideal',
  SOFORT = 'sofort',
  BANCONTACT = 'bancontact',
  GOOGLE_PAY = 'google_pay',
  PAYPAL_EXPRESS_CHECKOUT = 'paypal_express_checkout',
  DOTPAY = 'dotpay',
  GIROPAY = 'giropay',
  Netbanking_EMANDATES = 'netbanking_emandates',
  APPLEPAY = 'apple_pay',
  UPI = 'upi',
  DIRECT_DEBIT = 'direct_debit',
}

export enum Gateway {
  STRIPE = 'stripe',
  ADYEN = 'adyen',
  BRAINTREE = 'braintree',
  SPREEDLY = 'spreedly',
  CHARGEBEE = 'chargebee',
  CHECKOUT_COM = 'checkout_com',
  CYBERSOURCE = 'cybersource',
  BLUESNAP = 'bluesnap',
  INGENICO_DIRECT = 'ingenico_direct',
  WORLDPAY = 'worldpay',
  AUTHORIZE_NET = 'authorize_net',
  MOLLIE = 'mollie',
  RAZORPAY = 'razorpay',
  CHARGEBEE_PAYMENTS = 'chargebee_payments',
}

export enum PaymentAttemptStatus {
  INITED = 'inited',
  REQUIRES_IDENTIFICATION = 'requires_identification',
  REQUIRES_CHALLENGE = 'requires_challenge',
  REQUIRES_REDIRECTION = 'requires_redirection',
  AUTHORIZED = 'authorized',
  REFUSED = 'refused',
}

export enum Layout {
  IN_APP = 'in_app',
  FULL_PAGE = 'full_page',
}

export enum Module {
  COMPONENTS = 'components',
  THREE_DS_HANDLER = '3ds-handler',
  FUNCTIONS = 'functions',
  IDEAL = 'ideal',
  SOFORT = 'sofort',
  GOOGLE_PAY = 'google-pay',
  BANCONTACT = 'bancontact',
  DOTPAY = 'dotpay',
  GIROPAY = 'giropay',
  PAYPAL = 'paypal',
  NETBANKING_EMANDATES = 'netbanking_emandates',
  APPLE_PAY = 'apple-pay',
  UPI = 'upi',
}