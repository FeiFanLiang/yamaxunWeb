export const regions = [{
        region: '德国',
        regionId: 'de'
    },
    {
        region: '英国',
        regionId: 'uk'
    },
    {
        region: '法国',
        regionId: 'fr',
    },
    {
        region: '意大利',
        regionId: 'it',
    },
    {
        region: '西班牙',
        regionId: 'es',
    },
];

export const comStatusOptions = [{
        label: '全新',
        value: 1
    },
    {
        label: '非全新',
        value: 0
    }
]

export const tableColumn = [{
        en: 'color_name',
        zh: 'color_name(颜色名称)'
    }, {
        en: 'color_map',
        zh: '(color_map)颜色映射'
    },
    {
        en: 'size_name',
        zh: '(size_name)尺寸名称'
    },
    {
        en: 'size_map',
        zh: '(size_map)尺寸映射'
    },
    {
        en: 'price',
        zh: '(price)价格'
    },
    {
        en: 'conditionNote',
        zh: '(conditionNote)状况说明'
    },
    {
        en: 'quantity',
        zh: '(quantity)数量'
    },
    {
        en: 'imgurl1',
        zh: '主图链接'
    }
]

export const attrData = {
    joinStr: '&-&',
    dxmState: '',
    fullCid: '',
    skuAttDataArr: {},
    skuAttTheme: '',
    skuAttrRelation: {
        "nome colore": ["color_name"],
        "sabor": ["flavor_name"],
        "ancho": ["item_display_width"],
        "aroma": ["scent_name"],
        "bandcolor": ["band_color"],
        "basecurveradius": ["base_curve_radius"],
        "cantidad": ["quantity"],
        "cantidad de artículos en el paquete": ["item_package_quantity"],
        "cantidad de artículos por paquete": ["item_package_quantity"],
        "cantidad de producto en el empaque": ["number_of_items"],
        "cantidad del paquete de artículos": ["item_package_quantity"],
        "capacity": ["capacity"],
        "captype": ["cap_type"],
        "chamberheight": ["chamber_height"],
        "chamberwidth": ["chamber_width"],
        "color": ["color_name"],
        "color de la correa": ["band_color"],
        "color de la lente": ["lens_color"],
        "color del lente": ["lens_color"],
        "color del lente de color": ["lens_color", "color_name"],
        "color y cantidad del paquete de artículos": ["item_package_quantity", "color_name"],
        "color y largo": ["item_display_length", "size_name"],
        "color y tamaño": ["color_name", "size_name"],
        "color_name": ["color_name"],
        "colordisplaylenth": ["item_display_length", "color_name"],
        "colore": ["color_name"],
        "colorenome": ["color_name"],
        "colores en la cantidad de artículos por paquete": ["item_package_quantity", "color_name"],
        "colorlength": ["color_name", "item_display_length"],
        "colorlenscolor": ["lens_color", "color_name"],
        "colorname": ["color_name"],
        "colorsize": ["color_name", "size_name"],
        "colour": ["color_name"],
        "couleur": ["color_name"],
        "count": ["unit_count"],
        "cylinderaxis": ["cylinder_axis"],
        "cylindercorrection": ["cylinder_correction"],
        "denomination": ["denomination"],
        "design_name": ["design_name"],
        "designweight": ["package_weight"],
        "diameter": ["display_dimensions_unit_of_measure"],
        "displayheight": ["item_display_height"],
        "displaylength": ["item_display_length"],
        "displayweight": ["item_display_weight"],
        "displaywidth": ["item_display_width"],
        "edition": ["edition"],
        "estampado": ["pattern_name"],
        "estilo": ["style_name"],
        "estilo del tamaño": ["style_name", "size_name"],
        "farbe": ["color_name"],
        "flavor": ["flavor_name"],
        "flavorname": ["flavor_name"],
        "flavorsize": ["flavor_name", "size_name"],
        "flex del palo de golf": ["golf_club_flex"],
        "forma y tamaño": ["item_shape", "size_name"],
        "formato fragranza": ["scent_name"],
        "fragranza": ["scent_name"],
        "gemtype": ["gem_type"],
        "gewicht": ["item_display_weight"],
        "golfflex": ["golf_club_flex"],
        "golfflexgolfloft": ["golf_club_flex", "golf_club_loft"],
        "golfflexmaterial": ["golf_club_flex", "material_type"],
        "golfflexshaftmaterial": ["golf_club_flex", "shaft_material"],
        "golfloft": ["golf_club_loft"],
        "golfloftshaftmaterial": ["golf_club_loft", "shaft_material"],
        "gradedby": ["graded_by"],
        "graderating": ["grade_rating"],
        "gripsize": ["grip_size"],
        "gripsizegriptype": ["grip_size", "grip_type"],
        "gripsizeheadsize": ["grip_size"],
        "griptype": ["grip_type"],
        "größe": ["size_name"],
        "hand": ["hand_orientation"],
        "handshaftlength": ["hand_orientation", "shaft_length"],
        "handshaftmaterialgolfflex": ["hand_orientation", "shaft_material", "golf_club_flex"],
        "handshaftmaterialgolfflexgolfloft": ["hand_orientation", "shaft_material", "golf_club_flex"],
        "handsize": ["hand_orientation", "size_name"],
        "headsize": ["hand_orientation", "size_name"],
        "insidediameterstring": ["inside_diameter_string"],
        "itemdiameterstring": ["item_diameter_string"],
        "itemdisplayweight": ["item_display_weight"],
        "itemlengthstring": ["inside_length_string"],
        "itempackagequantity": ["item_package_quantity"],
        "itempackagequantitycolor": ["item_package_quantity", "color_name"],
        "itempackagequantitysize": ["item_package_quantity", "size_name"],
        "itemthickness": ["item_thickness_string"],
        "itemvolume": ["item_volume"],
        "itemweight": ["item_display_weight"],
        "largo": ["item_display_length"],
        "length": ["item_display_length"],
        "lengthrange": ["item_display_length"],
        "lengthsize": ["item_length", "size_name"],
        "lengthwidth": ["item_length", "item_width"],
        "lensadditionpower": ["lens_addition_power"],
        "lenscolor": ["lens_color"],
        "lenscolormaterial": ["lens_color", "material_type"],
        "lenscolorshape": ["lens_color", "item_shape"],
        "lenswidth": ["lens_width"],
        "lightpathdistance": ["light_path_distance"],
        "linecapacityweight": ["volume_capacity_name"],
        "linesize": ["line_size"],
        "loft del flex del palo de golf": ["golf_club_flex", "golf_club_loft"],
        "loft del palo de golf": ["golf_club_loft"],
        "longitud de la varilla para la mano": ["hand_orientation", "shaft_length"],
        "magnificationstrength": ["magnification_strength"],
        "mano": ["hand_orientation"],
        "material": ["material_type"],
        "material de la varilla del flex del palo de golf": ["shaft_material", "golf_club_flex"],
        "material de la varilla del loft del palo de golf": ["shaft_material", "golf_club_loft"],
        "material de la varilla para la mano y flex del palo de golf": ["shaft_material", "golf_club_flex", "hand_orientation"],
        "material de la varilla para la mano y loft del flex del palo de golf": ["shaft_material", "golf_club_loft", "hand_orientation"],
        "material del flex del palo de golf": ["shaft_material", "golf_club_flex"],
        "materialsize": ["material_type", "size_name"],
        "materialtype": ["material_type"],
        "maximumexpandablesize": ["maximum_size"],
        "mediatype": ["media_type_base"],
        "menge": ["max_order_quantity"],
        "metalstamp": ["metal_stamp"],
        "metaltype": ["metal_type"],
        "model": ["model"],
        "mostrar ancho": ["item_display_width"],
        "nivel de tensión": ["tension_level"],
        "nombre del color": ["color_name"],
        "nombre del color y del tamaño": ["size_name", "color_name"],
        "nombre del estilo": ["style_name"],
        "nombre del patron": ["pattern_name"],
        "nombre del patron y del tamano": ["pattern_name", "size_name"],
        "nombre del tamano": ["size_name"],
        "nombre del tamaño": ["size_name"],
        "nombredecolor": ["color_name"],
        "nombredetamaño": ["size_name"],
        "nome formato": ["size_name"],
        "number of items": ["number_of_items"],
        "number_of_items": ["number_of_items"],
        "numberofitems": ["number_of_items"],
        "número de artículos": ["number_of_items"],
        "numero de productos": ["part_number"],
        "opticalpower": ["optical_power"],
        "optiontype": ["option_type"],
        "outsidediameter": ["outside_diameter"],
        "papersize": ["paper_size_unit_of_measure"],
        "partnumber": ["part_number"],
        "pattern": ["pattern_name"],
        "patternname": ["pattern_name"],
        "patternnamesizename": ["pattern_name", "size_name"],
        "peso": ["item_display_weight"],
        "poresize": ["pore_size"],
        "produktmenge": ["number_of_items"],
        "quantità": ["quantity"],
        "quantité": ["quantity"],
        "quantity": ["quantity"],
        "quantityweight": ["quantity", "item_display_weight"],
        "ringsize": ["ring_size"],
        "scent": ["scent_name"],
        "seatinggroup": ["seating_group"],
        "septatype": ["septa_type"],
        "shaftmaterial": ["shaft_material"],
        "shape": ["item_shape"],
        "shapesize": ["item_shape", "size_name"],
        "shippingoptions": ["shipping_options"],
        "size": ["size_name"],
        "size_name": ["size_name"],
        "sizecolor": ["color_name", "size_name"],
        "sizen": ["size_name"],
        "sizename": ["size_name"],
        "sizenamecolorname": ["size_name", "color_name"],
        "sizeperpearl": ["size_per_pearl"],
        "sizestyle": ["style_name", "size_name"],
        "sizetensionlevel": ["tension_level", "size_name"],
        "sizeweight": ["item_width", "size_name"],
        "sizeweightsupported": ["maximum_weight_recommendation", "size_name"],
        "stoneshape": ["stone_shape"],
        "style": ["style_name"],
        "style name": ["style_name"],
        "style_name": ["style_name"],
        "stylename": ["style_name"],
        "supportedmediasize": ["supported_media_size"],
        "taglia": ["size_name"],
        "tagliacolore": ["color_name", "size_name"],
        "taglianome": ["size_name"],
        "taille": ["size_name"],
        "taillecouleur": ["color_name", "size_name"],
        "talla": ["size_name"],
        "tamaño": ["size_name"],
        "talla/tamaño": ["size_name"],
        "tamaño de empuñadura": ["grip_size", "size_name"],
        "tamaño de la mano": ["hand_orientation", "size_name"],
        "tamaño de línea": ["line_size"],
        "tamaño del cabezal de la empuñadura": ["grip_size", "size_name"],
        "tamaño del empaque del producto": ["number_of_items", "size_name"],
        "tamaño del material": ["material_type", "size_name"],
        "tamano del sabor": ["size_name", "flavor_name"],
        "tamaño y cantidad del paquete de artículos": ["item_package_quantity", "size_name"],
        "tamaño y estilo": ["style_name", "size_name"],
        "tamaño y largo": ["item_display_length", "size_name"],
        "tamaño y nivel de tensión": ["tension_level", "size_name"],
        "tamaño y nombre": ["size_name"],
        "tamaño y nombre—nombre de color": ["size_name", "color_name"],
        "tamaño y peso": ["item_display_weight", "size_name"],
        "tamaño y peso soportados": ["size_name", "item_display_weight"],
        "tamañocolor": ["color_name", "size_name"],
        "tamaño-color": ["size_name", "color_name"],
        "tamaños en la cantidad de artículos por paquete": ["item_package_quantity", "size_name"],
        "targetaudience": ["target_audience_base"],
        "tensionlevel": ["tension_level"],
        "tipo de empuñadura": ["grip_type"],
        "tipo de tamaño de empuñadura": ["grip_size", "grip_type"],
        "totaldiamondweight": ["total_diamond_weight"],
        "totalgemweight": ["total_gem_weight"],
        "unidades de embalaje": ["item_package_quantity"],
        "unitcount": ["unit_count"],
        "vataje": ["wattage"],
        "wattage": ["wattage"],
        "weight": ["item_display_weight"],
        "width": ["item_display_width"],
        "widthrange": ["item_display_weight"],
        "サイズ": ["size_name"],
        "色": ["color_name"],
        "商品の入り数": ["quantity"],
        "cupsize": ["cup_size"],
        "vintage": ["vintage"],
        "inkcolor": ["ink_color"],
        "package quantity": ["item_package_quantity"],
        "materialstyle": ["material_type", "style_name"],
        "lengthmaterial": ["item_length", "material_type"],
        "packagequantitysize": ["item_package_quantity", "size_name"],
        "カラー": ["color_name"],
        "potencia": ["wattage"],
        "cantidad por paquete": ["item_package_quantity"],
        "color de tinta": ["color_name"],
        "máximo tamaño expandible": ["maximum_size"],
        "tamaño de papel": ["paper_size_unit_of_measure"],
        "agegendercategory": ["age_gender_category"],
        "harddisksize": ["hard_disk_size"],
        "memorystoragecapacity": ["memory_storage_capacity"],
        "displaysize": ["display_size"],
        "hardwareplatform": ["hardware_platform1"],
        "itemdisplaywidth": ["item_display_width"],
        "itemdisplaylength": ["item_display_length"]
    },
    skuAttrMap: ["color_map", "size_map"],
    skuAttrRelationMap: {
        color_name: 'color_map',
        size_name: 'size_map'
    },
    skuAttrMapUse: {},
    brandAttr: {
        external_product_id: 'Product ID',
        part_number: 'MPN',
        model: 'Model number',
        catalog_number: 'Catalog number'
    },
    brandAttrData: {},
    proFixAttr: ['feed_product_type'],
    proFixAttrData: {},
    skuAttrRelationMapCheck: [],
    skuEndemicAttr: [],
    skuFixedAttr: ['external_product_id_type', 'condition_type', 'sale_price', 'feed_product_type'],
    skuFixedAttrData: {},
    skuThemeAttr: ['fulfillment_latency', 'merchant_shipping_group_name', 'offering_can_be_giftwrapped'],
    skuDefault: {
        condition_type: {
            id: 'condition_type',
            name: '物品状况'
        },
        condition_note: {
            id: 'condition_type',
            name: '描述' //物品描述
        },
        sale_price: {
            id: 'sale_price',
            name: '促销价'
        },
        sale_from_date: {
            id: 'sale_from_date',
            name: '促销时间'
        },
        sale_end_date: {
            id: 'sale_end_date',
            name: '促销时间'
        }
    },
    skuNotDisplay: ['item_sku', 'external_product_id', 'external_product_id_type', 'standard_price', 'quantity', 'condition_note', 'condition_type', 'feed_product_type',
        'main_image_url', 'swatch_image_url', 'other_image_url1', 'other_image_url1', 'other_image_url2', 'other_image_url3', 'other_image_url4',
        'other_image_url5', 'other_image_url6', 'other_image_url7', 'other_image_url8', 'variation_theme', 'sale_price', 'sale_from_date', 'sale_end_date',
        'fulfillment_latency', 'merchant_shipping_group_name', 'offering_can_be_giftwrapped'
    ], //属性ID 'variation_theme' 'size_name' 'size_map' 'sale_price' 'sale_from_date' 'sale_end_date',
    attrGroupNameImportant: ['Required', 'required', 'Obligatorio', '必須', 'Obbligatorio', 'Erforderlich', 'Obligatoire'],
    publicAttr: ['fulfillment_latency', 'merchant_shipping_group_name', 'offering_can_be_giftwrapped', 'feed_product_type'], //公共属性ID
}