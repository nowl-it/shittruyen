#!/bin/bash
templates_dir="templates"
templates=($(ls $templates_dir))

app_name=$1

if [ -z "$app_name" ]; then
  echo "Usage: create_template.sh <app_name>"
  exit 1
fi

for template in ${templates[@]}; do
  template_name=$(echo $template | cut -d'.' -f1)
  template_extension=$(echo $template | cut -d'.' -f2)
  template_content=$(cat $templates_dir/$template)
  template_content=$(echo "$template_content" | sed "s/%app_name%/$app_name/g")
  if [ -f $template_name/main.$template_extension ]; then
	rm $template_name/main.$template_extension
  fi
  mkdir -p $template_name
  echo "$template_content" > $template_name/main.$template_extension
  echo "Created $template_name/main.$template_extension"
done
