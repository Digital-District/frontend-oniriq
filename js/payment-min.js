!function(t){var e="paymentForm",a=function(e,a){return this.$T=t(e),this._init(e,a),this.options=t.extend(!0,{DEBUG:!1},a),this};a.prototype._init=function(e,a){var r=this;r.number=this.$T.find("[data-payment='cc-number']"),r.exp=this.$T.find("[data-payment='cc-exp']"),r.cvc=this.$T.find("[data-payment='cc-cvc']"),r.brand=this.$T.find("[data-payment='cc-brand']"),r.number.payment("formatCardNumber").data("payment-error-message","Please enter a valid credit card number."),r.exp.payment("formatCardExpiry").data("payment-error-message","Please enter a valid expiration date."),r.cvc.payment("formatCardCVC").data("payment-error-message","Please enter a valid CVC."),r.number.on("input",(function(){r.cardType=t.payment.cardType(r.number.val());var e=r.number.closest(".form-group");e.toggleClass("has-feedback",!0),e.find(".form-control-feedback").remove(),r.cardType?r.brand.text(r.cardType):t("[data-payment='cc-brand']").text("")})),r.number.on("change",(function(){r._setValidationState(t(this),!t.payment.validateCardNumber(t(this).val()))})),r.exp.on("change",(function(){r._setValidationState(t(this),!t.payment.validateCardExpiry(t(this).payment("cardExpiryVal")))})),r.cvc.on("change",(function(){r._setValidationState(t(this),!t.payment.validateCardCVC(t(this).val(),r.cardType))}))},a.prototype.valid=function(){var e=this,a=t.payment.validateCardNumber(e.number.val()),r=t.payment.validateCardExpiry(e.exp.payment("cardExpiryVal")),n=t.payment.validateCardCVC(e.cvc.val(),e.cardType);return e._setValidationState(e.number,!a),e._setValidationState(e.exp,!r),e._setValidationState(e.cvc,!n),a&&r&&n},a.prototype._setValidationState=function(t,e){var a=t.parent();return a.toggleClass("has-error",e).toggleClass("has-success",!e),a.find(".payment-error-message").remove(),e&&a.append("<span class='text-danger payment-error-message'>"+t.data("payment-error-message")+"</span>"),this},a.prototype.DLOG=function(){if(this.DEBUG)for(var t in arguments);},a.prototype.DWARN=function(){this.DEBUG},t.fn[e]=function(r){if(!t(this).length)return t(this);var n=t(this).data(e);return n&&0!=r.indexOf("_")&&n[r]&&"function"==typeof n[r]?n[r](Array.prototype.slice.call(arguments,1)):"object"!=typeof r&&r?void(n?0==r.indexOf("_")?t.error("Method "+r+" is private!"):t.error("Method "+r+" does not exist."):t.error("Plugin must be initialised before using method: "+r)):(n=new a(t(this),r),t(this).data(e,n),t(this))}}(jQuery);var payment_form=$("#payment-stripe").paymentForm();$("#validate").on("click",(function(){if(!$("#payment-stripe").paymentForm("valid"))return!1;$("#payment-stripe").submit()}));