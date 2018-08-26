const Joi = require("joi");

let instance = Joi.object().keys({
	model: Joi.string(),
	certificates: Joi.object().keys({
		wwdr: Joi.string().required(),
		signerCert: Joi.string().required(),
		signerKey: Joi.object().keys({
			keyFile: Joi.string().required(),
			passphrase: Joi.string().required(),
		}).required()
	}).required(),
	overrides: Joi.object(),
	shouldOverwrite: Joi.boolean()
});

let barcode = Joi.object().keys({
	altText: Joi.string(),
	messageEncoding: Joi.string().required(),
	format: Joi.string().required().regex(/(PKBarcodeFormatQR|PKBarcodeFormatPDF417|PKBarcodeFormatAztec|PKBarcodeFormatCode128)/, "barcodeType"),
	message: Joi.string().required()
});

let field = Joi.object().keys({
	attributedValue: Joi.string(),
	changeMessage: Joi.string(),
	dataDetectorType: Joi.array().items(Joi.string().regex(/(PKDataDetectorTypePhoneNumber|PKDataDetectorTypeLink|PKDataDetectorTypeAddress|PKDataDetectorTypeCalendarEvent)/, "dataDetectorType")),
	label: Joi.string(),
	textAlignment: Joi.string().regex(/(PKTextAlignmentLeft|PKTextAlignmentCenter|PKTextAlignmentRight|PKTextAlignmentNatural)/, "graphic-alignment"),
	key: Joi.string().required(),
	value: Joi.string().required()
});

let beaconsDict = Joi.object().keys({
	major: Joi.number().integer().positive().max(65535),
	minor: Joi.number().integer().positive().max(65535),
	proximityUUID: Joi.string().required(),
	relevantText: Joi.string()
});

let locationsDict = Joi.object().keys({
	altitude: Joi.number(),
	latitude: Joi.number().required(),
	longitude: Joi.number().required(),
	relevantText: Joi.string()
});

let passDict = Joi.object().keys({
	auxiliaryFields: Joi.array().items(field),
	backFields: Joi.array().items(field),
	headerFields: Joi.array().items(field),
	primaryFields: Joi.array().items(field),
	secondaryFields: Joi.array().items(field)
});

let transitType = Joi.string().regex(/(PKTransitTypeAir|PKTransitTypeBoat|PKTransitTypeBus|PKTransitTypeGeneric|PKTransitTypeTrain)/);

module.exports = {
	constants: {
		instance,
		barcode,
		field,
		passDict,
		beaconsDict,
		locationsDict,
		transitType
	},
	isValid: (opts, schemaName, debug = false) => {
		let validation = Joi.validate(opts, schemaName);

		if (debug) {
			console.log(validation)
		}

		return !validation.error;
	}
};
