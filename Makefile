readme: ## generate the README file TOC
	doctoc README.md --github

help: ## This help dialog.
	@IFS=$$'\n' ; \
  help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/:/'`); \
  printf "%-20s %s\n" "target" "help" ; \
  printf "%-20s %s\n" "------" "----" ; \
  for help_line in $${help_lines[@]}; do \
      IFS=$$':' ; \
      help_split=($$help_line) ; \
      help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
      help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
      printf '\033[36m'; \
      printf "%-20s %s" $$help_command ; \
      printf '\033[0m'; \
      printf "%s\n" $$help_info; \
  done
.DEFAULT_GOAL := help
