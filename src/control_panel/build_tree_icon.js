var d3 = require("d3");
var position_tree_icon = require('./position_tree_icon');
var toggle_menu = require('./toggle_menu');
var make_tree_menu = require('./make_tree_menu');

module.exports = function build_tree_icon(cgm){

  var slider_length = 40;
  var params = cgm.params;
  var default_opacity = 0.35;
  var high_opacity = 0.6;

  var tree_icon_outer_group = d3.select(params.root +' .control-container svg')
      .append('g')
      .classed( 'tree_icon', true)
      .on('mouseover', function(){
        d3.selectAll(params.root + ' .tree_leaf_circle')
          .style('opacity', high_opacity);
      })
      .on('mouseout', function(){
        if (params.viz.current_panel !== 'recluster'){
          d3.selectAll(params.root + ' .tree_leaf_circle')
          .style('opacity', default_opacity);
        }
      })
      // .call(tree_icon_tip);

  var tree_icon_group =  tree_icon_outer_group
    .append('g')
    .classed('dendro_tree_container', true)
    .on('click', function(){


      // show recluster menu
      // if (d3.select(params.root + ' .control-container svg .tree_menu').empty()){

      if (params.viz.current_panel === 'reorder'){

        console.log('switch to recluster')

        // modify buttons
        d3.select(params.root + ' .panel_button_title')
          .text('recluster'.toUpperCase())
        d3.select(params.root + ' .top_button_title')
          .text('DIST')
        d3.select(params.root + ' .bottom_button_title')
          .text('LINK')
        d3.selectAll(params.root + ' .reorder_buttons')
          .style('display', 'none');
        d3.select(params.root + ' .run_cluster_container')
          .style('display', 'block')

        d3.selectAll(params.root + ' .dist_options')
          .style('display', 'block')
        d3.selectAll(params.root + ' .link_options_container')
          .style('display', 'block')

        params.viz.current_panel = 'recluster'

        console.log(params.viz.current_panel)

        // toggle_menu(cgm, 'tree_menu', 'open', make_tree_menu);

      } else {

        console.log('switch to reorder')

        params.viz.current_panel = 'reorder'

        // modify buttons
        d3.select(params.root + ' .panel_button_title')
          .text('reorder'.toUpperCase())
        d3.select(params.root + ' .top_button_title')
          .text('COL')
        d3.select(params.root + ' .bottom_button_title')
          .text('ROW')
        d3.selectAll(params.root + ' .reorder_buttons')
          .style('display', 'block');
        d3.select(params.root + ' .run_cluster_container')
          .style('display', 'none')

        d3.selectAll(params.root + ' .dist_options')
          .style('display', 'none')
        d3.selectAll(params.root + ' .link_options_container')
          .style('display', 'none')

        // toggle_menu(cgm, 'tree_menu', 'close');
      }



    });

  d3.select(params.root + '  .control-container svg .dendro_tree_container')
    .attr('transform', 'scale(0.9)');

  position_tree_icon(cgm);

  var offset_triangle = 0;
  var tree_width = 20;

  // main branch
  tree_icon_group
    .append('path')
    .style('fill', 'black')
    .attr('transform', 'translate('+offset_triangle+', 0)')
    .attr('d', function() {

      // up triangle
      var start_x = 0;
      var start_y = slider_length;

      var mid_x = tree_width/2;
      var mid_y = 0;

      var final_x = tree_width;
      var final_y = slider_length;

      var output_string = 'M' + start_x + ',' + start_y + ' L' +
      mid_x + ', ' + mid_y +
      ' L' + final_x + ','+ final_y +' Z';

      return output_string;
    })
    .style('opacity', 0.35);

  // left branch
  var branch_height = 30;
  tree_icon_group
    .append('path')
    .style('fill', 'black')
    .attr('transform', 'translate('+offset_triangle+', 0)')
    .attr('d', function() {

      // up triangle
      var start_x = 4.3;
      var start_y = 23;

      var mid_x = -5;//left_x + slider_length/10;
      var mid_y = branch_height/2.5;

      var final_x = 5.8;//left_x + slider_length/5;
      var final_y = branch_height/1.8;

      var output_string = 'M' + start_x + ',' + start_y + ' L' +
      mid_x + ', ' + mid_y +
      ' L' + final_x + ','+ final_y +' Z';

      return output_string;
    })
    .style('opacity', 0.35);

  // right branch
  tree_icon_group
    .append('path')
    .style('fill', 'black')
    .attr('transform', 'translate('+offset_triangle+', 0)')
    .attr('d', function() {

      // up triangle
      var start_x = 15.7;
      var start_y = 23;

      var mid_x = 25;//left_x + slider_length/10;
      var mid_y = branch_height/2.5;

      var final_x = 14.2;//left_x + slider_length/5;
      var final_y = branch_height/1.8;

      var output_string = 'M' + start_x + ',' + start_y + ' L' +
      mid_x + ', ' + mid_y +
      ' L' + final_x + ','+ final_y +' Z';

      return output_string;
    })
    .style('opacity', 0.35);

  var small_leaf_offset = 13;
  var small_leaf_radius = 9.5;

  tree_icon_group
    .selectAll()
    .data([
      [-3,small_leaf_offset,small_leaf_radius],
      [tree_width/2,0, 17],
      [23,small_leaf_offset,small_leaf_radius]])
    .enter()
    .append('circle')
    .classed('tree_leaf_circle', true)
    .attr('r', function(d){
      return d[2];
    })
    .attr('transform', function(d){
      return 'translate('+d[0]+', '+d[1]+')';
    })
    .attr('fill', 'blue')
    .attr('opacity', default_opacity)
    // .attr('');

  tree_icon_group
    .append('rect')
    .attr('width', 50)
    .attr('height', 62)
    .attr('transform', function(){
      return 'translate('+ -15 +', '+ -19 +')';
    })
    .attr('opacity', 0.0);

  var control_panel_color = 'white';
  var text_color = '#47515b';
  var button_color = '#eee';
  // var active_run_color = '#008000' //
  var active_run_color = '#00FF75';
  let active_button_color = '#008000'

  var button_dim = {};
  button_dim.height = 32;
  button_dim.width = 63;
  button_dim.buffer = 12;
  button_dim.x_trans = button_dim.width + button_dim.buffer;
  button_dim.fs = 11;

  ///////////////////////////
  // Run Recluster Button
  ///////////////////////////
  run_cluster_container = d3.select(params.root + ' .control_svg')
    .append('g')
    .classed('run_cluster_container', true)
    .attr('transform', 'translate('+ 350  +', '+ 91 +')')
    .on('click', function(d){

      console.log('clicking run button', d)

    })
    .style('display', 'none');

  run_cluster_container
    .append('rect')
    .style('height', button_dim.height)
    .style('width', button_dim.width)
    .style('fill', control_panel_color)
    .style('rx', 10)
    .style('ry', 10)
    .style('stroke', active_run_color)
    .style('stroke-width', 2.5);

  run_cluster_container
    .append('text')
    .classed('button-name', true)
    .text('run'.toUpperCase())
    .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
    .style('font-weight', 400)
    .style('font-size', button_dim.fs)
    .style('text-anchor', 'middle')
    .style('stroke', text_color)
    .style('alignment-baseline', 'middle')
    .style('letter-spacing', '2px')
    .style('cursor', 'default')
    .style('-webkit-user-select', 'none')
    .attr('transform', 'translate('+ button_dim.width/2 +', '+ button_dim.height/2 +')');

  ///////////////////////////
  // Recluster Options
  ///////////////////////////

  var dist_options = ['cos', 'corr', 'eucl'];

  let dist_dict = {}
  dist_dict['cosine'] = 'cos'
  dist_dict['correlation'] = 'corr'
  dist_dict['euclidean'] = 'eucl'

  var cracker_room = 65;
  var shift_x_order_buttons = 65 + cracker_room;
  // button_groups.col.y_trans + button_dim.height + button_dim.buffer;

  let y_offset_top = 47
  let y_offset_bottom = 91

  // Distance Options Container
  ////////////////////////////////
  dist_options = d3.select(params.root + ' .control_svg')
    .append('g')
    .classed('dist_option_container', true)
    .selectAll('g')
    .data(dist_options)
    .enter()
    .append('g')
    .classed('dist_options', true)
    .attr('transform', function(d, i){
      var x_offset = button_dim.x_trans * i + shift_x_order_buttons;
      return 'translate('+ x_offset  +', '+ y_offset_top +')';
    })
    .on('click', function(d){

      console.log('clicking distance button', d)

      d3.select(params.root + ' .dist_option_container')
        .selectAll('rect')
        .attr('stroke', button_color);

      d3.select(this)
        .select('rect')
        .attr('stroke', active_button_color);

    })
    .style('display', 'none');

  dist_options
    .append('rect')
    .style('height', button_dim.height)
    .style('width', button_dim.width)
    .style('fill', control_panel_color)
    .style('rx', 10)
    .style('ry', 10)
    .attr('stroke', function(d){
      var i_color;
      if (dist_dict[params.matrix.distance_metric] == d){
        i_color = active_button_color;
      } else {
        i_color = button_color;
      }
      return i_color;
    })
    .style('stroke-width', 2.5);

  dist_options
    .append('text')
    .classed('button-name', true)
    .text((d) => d.toUpperCase())
    .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
    .style('font-weight', 400)
    .style('font-size', button_dim.fs)
    .style('text-anchor', 'middle')
    .style('stroke', text_color)
    .style('alignment-baseline', 'middle')
    .style('letter-spacing', '2px')
    .style('cursor', 'default')
    .style('-webkit-user-select', 'none')
    .attr('transform', 'translate('+ button_dim.width/2 +', '+ button_dim.height/2 +')');

  // Linkage Options Container
  ////////////////////////////////
  var link_options = ['avg', 'single', 'cmplt'];
  let link_dict = {}
  link_dict['average'] = 'avg'
  link_dict['single'] = 'single'
  link_dict['complete'] = 'cmplt'


  link_options_container = d3.select(params.root + ' .control_svg')
    .append('g')
    .classed('link_option_container', true)
    .selectAll('g')
    .data(link_options)
    .enter()
    .append('g')
    .classed('link_options_container', function(d){
      console.log('HERE')
      return true
    })
    .attr('transform', function(d, i){
      var x_offset = button_dim.x_trans * i + shift_x_order_buttons;
      return 'translate('+ x_offset  +', '+ y_offset_bottom +')';
    })
    .on('click', function(d){

      console.log('clicking linkage button', d)

      d3.select(params.root + ' .link_option_container')
        .selectAll('rect')
        .attr('stroke', button_color);

      d3.select(this)
        .select('rect')
        .attr('stroke', active_button_color);

    })
    .style('display', 'none');

  link_options_container
    .append('rect')
    .style('height', button_dim.height)
    .style('width', button_dim.width)
    .style('fill', control_panel_color)
    .style('rx', 10)
    .style('ry', 10)
    .attr('stroke', function(d){
      var i_color;
      if (link_dict[params.matrix.linkage_type] == d){
        i_color = active_button_color;
      } else {
        i_color = button_color;
      }
      return i_color;
    })
    .style('stroke-width', 2.5);

  link_options_container
    .append('text')
    .classed('button-name', true)
    .text((d) => d.toUpperCase())
    .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
    .style('font-weight', 400)
    .style('font-size', button_dim.fs)
    .style('text-anchor', 'middle')
    .style('stroke', text_color)
    .style('alignment-baseline', 'middle')
    .style('letter-spacing', '2px')
    .style('cursor', 'default')
    .style('-webkit-user-select', 'none')
    .attr('transform', 'translate('+ button_dim.width/2 +', '+ button_dim.height/2 +')');


};

