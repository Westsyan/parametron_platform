

function restart(obj) {
    var id = obj.value;
    $.ajax({
        url: "/parametron/sample/deployGet?id=" + id,
        type: "get",
        dataType: "json",
        success: function (data) {
            hideArgue();
            if(data.inputType == "PE"){
                $("#peId").val(data.id);
                $("#proname_pe").val(data.proname);
                $("#sample_pe").val(data.sample);
                $("#encondingType_pe").val(data.encondingType);
                $("#stepMethod_pe").val(data.stepMethod);
                $("#adapter_pe").val(data.adapter);
                $("#seed_mismatches_pe").val(data.seed_mismatches);
                $("#palindrome_clip_threshold_pe").val(data.palindrome_clip_threshold);
                $("#simple_clip_threshold_pe").val(data.simple_clip_threshold);
                $("#trimMethod_pe").val(data.trimMethod);
                $("#window_size_pe").val(data.window_size);
                $("#required_quality_pe").val(data.required_quality);
                $("#minlenMethod_pe").val(data.minlenMethod);
                $("#minlen_pe").val(data.minlen);
                $("#leadingMethod_pe").val(data.leadingMethod);
                $("#leading_pe").val(data.leading);
                $("#trailingMethod_pe").val(data.trailingMethod);
                $("#trailing_pe").val(data.trailing);
                $("#cropMethod_pe").val(data.cropMethod);
                $("#crop_pe").val(data.crop);
                $("#headcropMethod_pe").val(data.headcropMethod);
                $("#headcrop_pe").val(data.headcrop);
                $("#rna_strandness_pe").val(data.rna_strandness);
                $("#paired_end_options_selector_pe").val(data.paired_end_options_selector);
                $("#minins_pe").val(data.minins);
                $("#maxins_pe").val(data.maxins);
                $("#no_mixed_pe").val(data.no_mixed);
                $("#no_discordant_pe").val(data.no_discordant);
                $("#gtf_pe").val(data.gtf);
                $("#report_type_pe").val(data.report_type);
                $("#max_primary_pe").val(data.max_primary);
                $("#alignment_options_selector_pe").val(data.alignment_options_selector);
                $("#function_type_pe").val(data.function_type);
                $("#constant_term_pe").val(data.constant_term);
                $("#coefficient_pe").val(data.coefficient);
                $("#ignore_quals_pe").val(data.ignore_quals);
                $("#skip_forward_pe").val(data.skip_forward);
                $("#skip_reverse_pe").val(data.skip_reverse);
                $("#input_options_selector_pe").val(data.input_options_selector);
                $("#skip_pe").val(data.skip);
                $("#stop_after_pe").val(data.stop_after);
                $("#trim_five_pe").val(data.trim_five);
                $("#trim_three_pe").val(data.trim_three);
                $("#scoring_options_selector_pe").val(data.scoring_options_selector);
                $("#score_function_type_pe").val(data.score_function_type);
                $("#score_constant_term_pe").val(data.score_constant_term);
                $("#score_coefficient_pe").val(data.score_coefficient);
                $("#match_bonus_pe").val(data.match_bonus);
                $("#max_mismatch_pe").val(data.max_mismatch);
                $("#min_mismatch_pe").val(data.min_mismatch);
                $("#ambiguous_penalty_pe").val(data.ambiguous_penalty);
                $("#soft_clip_penalty_max_pe").val(data.soft_clip_penalty_max);
                $("#soft_clip_penalty_min_pe").val(data.soft_clip_penalty_min);
                $("#read_open_penalty_pe").val(data.read_open_penalty);
                $("#read_extend_penalty_pe").val(data.read_extend_penalty);
                $("#ref_open_penalty_pe").val(data.ref_open_penalty);
                $("#ref_extend_penalty_pe").val(data.ref_extend_penalty);
                $("#spliced_options_selector_pe").val(data.spliced_options_selector);
                $("#canonical_penalty_pe").val(data.canonical_penalty);
                $("#noncanonical_penalty_pe").val(data.noncanonical_penalty);
                $("#spliced_function_type_pe").val(data.spliced_function_type);
                $("#spliced_constant_term_pe").val(data.spliced_constant_term);
                $("#spliced_coefficient_pe").val(data.spliced_coefficient);
                $("#nc_function_type_pe").val(data.nc_function_type);
                $("#nc_constant_term_pe").val(data.nc_constant_term);
                $("#nc_coefficient_pe").val(data.nc_coefficient);
                $("#min_intron_pe").val(data.min_intron);
                $("#max_intron_pe").val(data.max_intron);
                $("#no_spliced_alignment_pe").val(data.no_spliced_alignment);
                $("#tma_pe").val(data.tma);
                if(data.stepMethod == "yes"){
                    $(".stepValue").show();
                }else{
                    $(".stepValue").hide();
                }
                if(data.trimMethod == "yes"){
                    $(".trimValue").show();
                }else{
                    $(".trimValue").hide();
                }
                if(data.minlenMethod == "yes"){
                    $(".minlenValue").show();
                }else{
                    $(".minlenValue").hide();
                }
                if(data.leadingMethod == "yes"){
                    $(".leadingValue").show();
                }else{
                    $(".leadingValue").hide();
                }
                if(data.trailingMethod == "trailingMethod"){
                    $(".trailingValue").show();
                }else{
                    $(".trailingValue").hide();
                }
                if(data.cropMethod == "yes"){
                    $(".cropValue").show();
                }else{
                    $(".cropValue").hide();
                }
                if(data.headcropMethod == "yes"){
                    $(".headcropValue").show();
                }else{
                    $(".headcropValue").hide();
                }
                if(data.paired_end_options_selector == "advanced"){
                    $(".pairedValue").show();
                }else{
                    $(".pairedValue").hide();
                }
                if(data.report_type == "advanced"){
                    $(".reportValue").show();
                }else{
                    $(".reportValue").hide();
                }
                if(data.alignment_options_selector == "advanced"){
                    $(".alignValue").show();
                }else{
                    $(".alignValue").hide();
                }
                if(data.input_options_selector == "advanced"){
                    $(".inputValue").show();
                }else{
                    $(".inputValue").hide();
                }
                if(data.scoring_options_selector == "advanced"){
                    $(".scoreValue").show();
                }else{
                    $(".scoreValue").hide();
                }
                if(data.spliced_options_selector == "advanced"){
                    $(".splicedValue").show();
                }else{
                    $(".splicedValue").hide();
                }
                $("#restPE").modal("show")
            }else{
                $("#seId").val(data.id);
                $("#proname_se").val(data.proname);
                $("#sample_se").val(data.sample);
                $("#encondingType_se").val(data.encondingType);
                $("#stepMethod_se").val(data.stepMethod);
                $("#adapter_se").val(data.adapter);
                $("#seed_mismatches_se").val(data.seed_mismatches);
                $("#palindrome_clip_threshold_se").val(data.palindrome_clip_threshold);
                $("#simple_clip_threshold_se").val(data.simple_clip_threshold);
                $("#trimMethod_se").val(data.trimMethod);
                $("#window_size_se").val(data.window_size);
                $("#required_quality_se").val(data.required_quality);
                $("#minlenMethod_se").val(data.minlenMethod);
                $("#minlen_se").val(data.minlen);
                $("#leadingMethod_se").val(data.leadingMethod);
                $("#leading_se").val(data.leading);
                $("#trailingMethod_se").val(data.trailingMethod);
                $("#trailing_se").val(data.trailing);
                $("#cropMethod_se").val(data.cropMethod);
                $("#crop_se").val(data.crop);
                $("#headcropMethod_se").val(data.headcropMethod);
                $("#headcrop_se").val(data.headcrop);
                $("#rna_strandness_se").val(data.rna_strandness);
                $("#paired_end_options_selector_se").val(data.paired_end_options_selector);
                $("#minins_se").val(data.minins);
                $("#maxins_se").val(data.maxins);
                $("#no_mixed_se").val(data.no_mixed);
                $("#no_discordant_se").val(data.no_discordant);
                $("#gtf_se").val(data.gtf);
                $("#report_type_se").val(data.report_type);
                $("#max_primary_se").val(data.max_primary);
                $("#alignment_options_selector_se").val(data.alignment_options_selector);
                $("#function_type_se").val(data.function_type);
                $("#constant_term_se").val(data.constant_term);
                $("#coefficient_se").val(data.coefficient);
                $("#ignore_quals_se").val(data.ignore_quals);
                $("#skip_forward_se").val(data.skip_forward);
                $("#skip_reverse_se").val(data.skip_reverse);
                $("#input_options_selector_se").val(data.input_options_selector);
                $("#skip_se").val(data.skip);
                $("#stop_after_se").val(data.stop_after);
                $("#trim_five_se").val(data.trim_five);
                $("#trim_three_se").val(data.trim_three);
                $("#scoring_options_selector_se").val(data.scoring_options_selector);
                $("#score_function_type_se").val(data.score_function_type);
                $("#score_constant_term_se").val(data.score_constant_term);
                $("#score_coefficient_se").val(data.score_coefficient);
                $("#match_bonus_se").val(data.match_bonus);
                $("#max_mismatch_se").val(data.max_mismatch);
                $("#min_mismatch_se").val(data.min_mismatch);
                $("#ambiguous_penalty_se").val(data.ambiguous_penalty);
                $("#soft_clip_penalty_max_se").val(data.soft_clip_penalty_max);
                $("#soft_clip_penalty_min_se").val(data.soft_clip_penalty_min);
                $("#read_open_penalty_se").val(data.read_open_penalty);
                $("#read_extend_penalty_se").val(data.read_extend_penalty);
                $("#ref_open_penalty_se").val(data.ref_open_penalty);
                $("#ref_extend_penalty_se").val(data.ref_extend_penalty);
                $("#spliced_options_selector_se").val(data.spliced_options_selector);
                $("#canonical_penalty_se").val(data.canonical_penalty);
                $("#noncanonical_penalty_se").val(data.noncanonical_penalty);
                $("#spliced_function_type_se").val(data.spliced_function_type);
                $("#spliced_constant_term_se").val(data.spliced_constant_term);
                $("#spliced_coefficient_se").val(data.spliced_coefficient);
                $("#nc_function_type_se").val(data.nc_function_type);
                $("#nc_constant_term_se").val(data.nc_constant_term);
                $("#nc_coefficient_se").val(data.nc_coefficient);
                $("#min_intron_se").val(data.min_intron);
                $("#max_intron_se").val(data.max_intron);
                $("#no_spliced_alignment_se").val(data.no_spliced_alignment);
                $("#tma_se").val(data.tma);
                if(data.stepMethod == "yes"){
                    $(".stepValue").show();
                }else{
                    $(".stepValue").hide();
                }
                if(data.trimMethod == "yes"){
                    $(".trimValue").show();
                }else{
                    $(".trimValue").hide();
                }
                if(data.minlenMethod == "yes"){
                    $(".minlenValue").show();
                }else{
                    $(".minlenValue").hide();
                }
                if(data.leadingMethod == "yes"){
                    $(".leadingValue").show();
                }else{
                    $(".leadingValue").hide();
                }
                if(data.trailingMethod == "trailingMethod"){
                    $(".trailingValue").show();
                }else{
                    $(".trailingValue").hide();
                }
                if(data.cropMethod == "yes"){
                    $(".cropValue").show();
                }else{
                    $(".cropValue").hide();
                }
                if(data.headcropMethod == "yes"){
                    $(".headcropValue").show();
                }else{
                    $(".headcropValue").hide();
                }
                if(data.paired_end_options_selector == "advanced"){
                    $(".pairedValue").show();
                }else{
                    $(".pairedValue").hide();
                }
                if(data.report_type == "advanced"){
                    $(".reportValue").show();
                }else{
                    $(".reportValue").hide();
                }
                if(data.alignment_options_selector == "advanced"){
                    $(".alignValue").show();
                }else{
                    $(".alignValue").hide();
                }
                if(data.input_options_selector == "advanced"){
                    $(".inputValue").show();
                }else{
                    $(".inputValue").hide();
                }
                if(data.scoring_options_selector == "advanced"){
                    $(".scoreValue").show();
                }else{
                    $(".scoreValue").hide();
                }
                if(data.spliced_options_selector == "advanced"){
                    $(".splicedValue").show();
                }else{
                    $(".splicedValue").hide();
                }
                $("#restSE").modal("show")
            }
        }
    })
}

$("#down-1").click(function () {
    $("#set-1").show();
    $("#down-1").hide();
    $("#up-1").show()
});

$("#up-1").click(function () {
    $("#set-1").hide();
    $("#down-1").show();
    $("#up-1").hide()
});

$("#down-2").click(function () {
    $("#set-2").show();
    $("#down-2").hide();
    $("#up-2").show()
});

$("#up-2").click(function () {
    $("#set-2").hide();
    $("#down-2").show();
    $("#up-2").hide()
});

$("#down-3").click(function () {
    $("#set-3").show();
    $("#down-3").hide();
    $("#up-3").show()
});

$("#up-3").click(function () {
    $("#set-3").hide();
    $("#down-3").show();
    $("#up-3").hide()
});


$("#down-4").click(function () {
    $("#set-4").show();
    $("#down-4").hide();
    $("#up-4").show()
});

$("#up-4").click(function () {
    $("#set-4").hide();
    $("#down-").show();
    $("#up-4").hide()
});


function stepChange(element) {
    var value = $(element).find(">option:selected").val()
    if (value == "yes") {
        $(".stepValue").show()
    } else {
        $(".stepValue").hide()
    }
}

function trimChange(element) {
    var value = $(element).find(">option:selected").val()
    if (value == "yes") {
        $(".trimValue").show()
    } else {
        $(".trimValue").hide()
    }
}

function minlenChange(element) {
    var value = $(element).find(">option:selected").val()
    if (value == "yes") {
        $(".minlenValue").show()
    } else {
        $(".minlenValue").hide()
    }
}

function leadingChange(element) {
    var value = $(element).find(">option:selected").val()
    if (value == "yes") {
        $(".leadingValue").show()
    } else {
        $(".leadingValue").hide()
    }
}

function trailingChange(element) {
    var value = $(element).find(">option:selected").val()
    if (value == "yes") {
        $(".trailingValue").show()
    } else {
        $(".trailingValue").hide()
    }
}

function cropChange(element) {
    var value = $(element).find(">option:selected").val()
    if (value == "yes") {
        $(".cropValue").show()
    } else {
        $(".cropValue").hide()
    }
}

function headcropChange(element) {
    var value = $(element).find(">option:selected").val()
    if (value == "yes") {
        $(".headcropValue").show()
    } else {
        $(".headcropValue").hide()
    }
}

function pairedChange(element) {
    var value = $(element).find(">option:selected").val()
    if (value == "advanced") {
        $(".pairedValue").show()
    } else {
        $(".pairedValue").hide()
    }
}

function reportChange(element) {
    var value = $(element).find(">option:selected").val()
    if (value == "advanced") {
        $(".reportValue").show()
    } else {
        $(".reportValue").hide()
    }
}

function alignChange(element) {
    var value = $(element).find(">option:selected").val()
    if (value == "advanced") {
        $(".alignValue").show()
    } else {
        $(".alignValue").hide()
    }
}

function inputChange(element) {
    var value = $(element).find(">option:selected").val()
    if (value == "advanced") {
        $(".inputValue").show()
    } else {
        $(".inputValue").hide()
    }
}

function scoreChange(element) {
    var value = $(element).find(">option:selected").val()
    if (value == "advanced") {
        $(".scoreValue").show()
    } else {
        $(".scoreValue").hide()
    }
}

function splicedChange(element) {
    var value = $(element).find(">option:selected").val()
    if (value == "advanced") {
        $(".splicedValue").show()
    } else {
        $(".splicedValue").hide()
    }
}

function RunningPE() {
    var form = $("#resetPEForm")
    var fv = form.data("formValidation")
    fv.validate();
    if (fv.isValid()) {
        $.ajax({
            url:"/parametron/sample/resetPE",
            type:"post",
            dataType:"json",
            data: $("#resetPEForm").serialize(),
            success:function (data) {
                if(data.valid == "true"){
                    $("#restPE").modal("hide");
                    updateTable();
                    var id = $("#peId").val();
                    $.ajax({
                        url: "/parametron/sample/isRunCmd?id=" + id,
                        type: "post"
                    })
                }
            }
        })
    }
}

function RunningSE() {
    var form = $("#resetSEForm")
    var fv = form.data("formValidation")
    fv.validate();
    if (fv.isValid()) {
        $.ajax({
            url:"/parametron/sample/resetSE",
            type:"post",
            dataType:"json",
            data: $("#resetSEForm").serialize(),
            success:function (data) {
                if(data.valid == "true"){
                    $("#restSE").modal("hide");
                    updateTable();
                    var id = $("#seId").val();
                    $.ajax({
                        url: "/parametron/sample/isRunCmd?id=" + id,
                        type: "post"
                    })
                }
            }
        })
    }
}

function hideArgue() {
    $("#set-1").hide();
    $("#down-1").show();
    $("#up-1").hide();
    $("#set-2").hide();
    $("#down-2").show();
    $("#up-2").hide();
    $("#set-3").hide();
    $("#down-3").show();
    $("#up-3").hide();
    $("#set-4").hide();
    $("#down-4").show();
    $("#up-4").hide();

}


function formValidation() {
    $('#resetPEForm').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            seed_mismatches:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            palindrome_clip_threshold:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            simple_clip_threshold:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            window_size:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            required_quality:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            minlen:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            leading:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            trailing:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            crop:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            headcrop:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            m:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            M:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            x:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    numeric: {
                        message: '必须为数字！'
                    }
                }
            },
            minins:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            maxins:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            max_primary:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    numeric: {
                        message: '必须为数字！'
                    }
                }
            },
            constant_term:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            coefficient:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            skip:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    numeric: {
                        message: '必须为数字！'
                    },
                    between: {
                        min: 0,
                        max: 9999999999999,
                        message: "最小值为0！"
                    }
                }
            },
            stop_after:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    numeric: {
                        message: '必须为数字！'
                    },
                    between: {
                        min: 0,
                        max: 9999999999999,
                        message: "最小值为0！"
                    }
                }
            },
            trim_five:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    numeric: {
                        message: '必须为数字！'
                    },
                    between: {
                        min: 0,
                        max: 9999999999999,
                        message: "最小值为0！"
                    }
                }
            },
            trim_three:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    numeric: {
                        message: '必须为数字！'
                    },
                    between: {
                        min: 0,
                        max: 9999999999999,
                        message: "最小值为0！"
                    }
                }
            },
            score_constant_term:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    numeric: {
                        message: '必须为数字！'
                    }
                }
            },
            score_coefficient:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    numeric: {
                        message: '必须为数字！'
                    }
                }
            },
            match_bonus:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            max_mismatch:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            min_mismatch:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            ambiguous_penalty:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            soft_clip_penalty_max:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            soft_clip_penalty_min:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            read_open_penalty:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            ref_extend_penalty:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            canonical_penalty:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            noncanonical_penalty:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            spliced_constant_term:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    numeric: {
                        message: '必须为数字！'
                    }
                }
            },
            spliced_coefficient:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    numeric: {
                        message: '必须为整数！'
                    }
                }
            },
            nc_constant_term:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    numeric: {
                        message: '必须为数字！'
                    }
                }
            },
            nc_coefficient:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    numeric: {
                        message: '必须为整数！'
                    }
                }
            },
            min_intron:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            },
            max_intron:{
                validators: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                    integer: {
                        message: '必须为整数！'
                    }
                }
            }
        }
    })};
    $('#resetSEForm').formValidation({
    framework: 'bootstrap',
    icon: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        seed_mismatches:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        palindrome_clip_threshold:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        simple_clip_threshold:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        window_size:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        required_quality:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        minlen:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        leading:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        trailing:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        crop:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        headcrop:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        m:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        M:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        x:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                numeric: {
                    message: '必须为数字！'
                }
            }
        },
        max_primary:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                numeric: {
                    message: '必须为数字！'
                }
            }
        },
        constant_term:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        coefficient:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        skip:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                numeric: {
                    message: '必须为数字！'
                },
                between: {
                    min: 0,
                    max: 9999999999999,
                    message: "最小值为0！"
                }
            }
        },
        stop_after:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                numeric: {
                    message: '必须为数字！'
                },
                between: {
                    min: 0,
                    max: 9999999999999,
                    message: "最小值为0！"
                }
            }
        },
        trim_five:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                numeric: {
                    message: '必须为数字！'
                },
                between: {
                    min: 0,
                    max: 9999999999999,
                    message: "最小值为0！"
                }
            }
        },
        trim_three:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                numeric: {
                    message: '必须为数字！'
                },
                between: {
                    min: 0,
                    max: 9999999999999,
                    message: "最小值为0！"
                }
            }
        },
        score_constant_term:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                numeric: {
                    message: '必须为数字！'
                }
            }
        },
        score_coefficient:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                numeric: {
                    message: '必须为数字！'
                }
            }
        },
        match_bonus:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        max_mismatch:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        min_mismatch:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        ambiguous_penalty:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        soft_clip_penalty_max:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        soft_clip_penalty_min:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        read_open_penalty:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        ref_extend_penalty:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        canonical_penalty:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        noncanonical_penalty:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        spliced_constant_term:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                numeric: {
                    message: '必须为数字！'
                }
            }
        },
        spliced_coefficient:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                numeric: {
                    message: '必须为整数！'
                }
            }
        },
        nc_constant_term:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                numeric: {
                    message: '必须为数字！'
                }
            }
        },
        nc_coefficient:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                numeric: {
                    message: '必须为整数！'
                }
            }
        },
        min_intron:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        },
        max_intron:{
            validators: {
                notEmpty: {
                    message: '不能为空！'
                },
                integer: {
                    message: '必须为整数！'
                }
            }
        }
    }
})




